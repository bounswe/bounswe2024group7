package com.group7.demo.services;

import com.group7.demo.dtos.PostRequest;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.dtos.mapper.Mapper;
import com.group7.demo.exceptions.UnauthorizedException;
import com.group7.demo.models.*;
import com.group7.demo.repository.PostRepository;
import com.group7.demo.repository.TagRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import com.group7.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostService {

    private PostRepository postRepository;

    private TagRepository tagRepository;

    private UserRepository userRepository;

    private TrainingProgramRepository trainingProgramRepository;

    private AuthenticationService authenticationService;

    private Mapper mapper;

    @Transactional
    public PostResponse createPost(PostRequest postRequest, HttpServletRequest request) {
        Set<Tag> tags = new HashSet<>();

        for (String tagName : postRequest.getTags()) {
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        // Create and save the new Tag
                        Tag newTag = Tag.builder().name(tagName).build();
                        return tagRepository.save(newTag);
                    });
            tags.add(tag);
        }
        User user = authenticationService.getAuthenticatedUserInternal(request);
        // Fetch the associated TrainingProgram if provided
        TrainingProgram trainingProgram = Optional.ofNullable(postRequest.getTrainingProgramId())
                .flatMap(trainingProgramRepository::findById)
                .orElse(null);

        Post post = Post.builder()
                .content(postRequest.getContent())
                .createdAt(LocalDateTime.now())
                .tags(tags)
                .user(user)  // Associate the post with the user
                .trainingProgram(trainingProgram)
                .imageUrl(postRequest.getImageUrl())
                .build();

        Post savedPost = postRepository.save(post);

        return mapper.mapToPostResponse(savedPost, request);
    }

    @Transactional
    public List<PostResponse> getAllPosts(HttpServletRequest request) {
        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(post -> mapper.mapToPostResponse(post, request))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PostResponse> getPostsByUser(String username, HttpServletRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));

        List<Post> posts = postRepository.findByUser(user);

        return posts.stream()
                .map(post -> mapper.mapToPostResponse(post, request))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletePost(Long postId, HttpServletRequest request) throws IllegalAccessException {
        User authenticatedUser = authenticationService.getAuthenticatedUserInternal(request);

        // Check if the post exists
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        // Check if the authenticated user is the owner of the post
        if (!post.getUser().equals(authenticatedUser)) {
            throw new IllegalAccessException("Unauthorized: You are not allowed to delete this post");
        }

        // Remove the post from the user's post collection
        User user = post.getUser();
        if (user != null) {
            user.getPosts().remove(post);
        }

        // Remove all associations between the post and tags
        post.getTags().forEach(tag -> tag.getPosts().remove(post));
        post.getTags().clear();  // Clear the post's tags to ensure the association is removed

        // Finally, delete the post
        postRepository.delete(post);
    }

    @Transactional
    public List<PostResponse> getPostsByTags(Set<String> tagNames, HttpServletRequest request) {
        List<Post> posts = postRepository.findPostsByTags(tagNames);
        return posts.stream()
                .map(post -> mapper.mapToPostResponse(post, request))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PostResponse> getRandomPosts(int count, HttpServletRequest request) {
        List<Post> allPosts = postRepository.findAll();
        Collections.shuffle(allPosts);
        return allPosts.stream()
                .limit(count)
                .map(post -> mapper.mapToPostResponse(post, request))
                .collect(Collectors.toList());
    }

    private User validateAuthenticatedUser(HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        if (user == null) {
            throw new UnauthorizedException("You must be logged in to perform this action");
        }
        return user;
    }

    @Transactional
    public void likePost(Long postId, HttpServletRequest request) {
        User user = validateAuthenticatedUser(request);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        if (!post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().add(user);
            postRepository.save(post);
        }
    }

    @Transactional
    public void unlikePost(Long postId, HttpServletRequest request) {
        User user = validateAuthenticatedUser(request);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        post.getLikedByUsers().remove(user);
        postRepository.save(post);
    }

    @Transactional
    public void bookmarkPost(Long postId, HttpServletRequest request) {
        User user = validateAuthenticatedUser(request);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        if (!post.getBookmarkedByUsers().contains(user)) {
            post.getBookmarkedByUsers().add(user);
            postRepository.save(post);
        }
    }

    @Transactional
    public void unbookmarkPost(Long postId, HttpServletRequest request) {
        User user = validateAuthenticatedUser(request);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        post.getBookmarkedByUsers().remove(user);
        postRepository.save(post);
    }

    @Transactional
    public List<PostResponse> getBookmarkedPosts(HttpServletRequest request) {
        User user = validateAuthenticatedUser(request);
        return postRepository.findByBookmarkedByUsersContaining(user).stream()
                .map(post -> mapper.mapToPostResponse(post, request))
                .collect(Collectors.toList());
    }
}
