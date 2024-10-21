package com.group7.demo.services;

import com.group7.demo.dtos.PostRequest;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.models.Post;
import com.group7.demo.models.Tag;
import com.group7.demo.models.User;
import com.group7.demo.repository.PostRepository;
import com.group7.demo.repository.TagRepository;
import com.group7.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
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

    private AuthenticationService authenticationService;

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

        Post post = Post.builder()
                .content(postRequest.getContent())
                .createdAt(LocalDateTime.now())
                .tags(tags)
                .user(user)  // Associate the post with the user
                .build();

        Post savedPost = postRepository.save(post);

        return mapToPostResponse(savedPost);
    }


    public List<PostResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(this::mapToPostResponse)
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

    public List<PostResponse> getPostsByTags(Set<String> tagNames) {
        // Fetch all posts with tags
        List<Post> posts = postRepository.findAllPostsWithTags();

        // Filter posts that have at least one of the requested tags
        return posts.stream()
                .filter(post -> post.getTags().stream()
                        .anyMatch(tag -> tagNames.contains(tag.getName())))
                .map(this::mapToPostResponse)
                .collect(Collectors.toList());
    }

    public List<PostResponse> getRandomPosts(int count) {
        List<Post> allPosts = postRepository.findAll();
        Collections.shuffle(allPosts);
        return allPosts.stream()
                .limit(count)
                .map(this::mapToPostResponse)
                .collect(Collectors.toList());
    }

    private PostResponse mapToPostResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getContent(),
                post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()),  // Only tag names
                post.getCreatedAt(),
                post.getUser().getUsername()
        );
    }


}
