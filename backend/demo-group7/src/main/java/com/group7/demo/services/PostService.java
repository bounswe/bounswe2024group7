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
    public PostResponse createPost(PostRequest postRequest) {
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

        User user = userRepository.findById(postRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + postRequest.getUserId()));


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
        List<Object[]> results = postRepository.findAllPostDataWithTags();

        Map<Long, PostResponse> postResponseMap = new HashMap<>();

        for (Object[] result : results) {
            Long postId = (Long) result[0];
            String content = (String) result[1];
            LocalDateTime createdAt = (LocalDateTime) result[2];
            String tagName = (String) result[3];
            Long userId = (Long) result[4];

            // Check if the PostResponse already exists for this post
            PostResponse postResponse = postResponseMap.get(postId);

            if (postResponse == null) {
                // Create a new PostResponse if it doesn't exist
                postResponse = new PostResponse(postId, content, new HashSet<>(), createdAt, userId);
                postResponseMap.put(postId, postResponse);
            }

            // Add the tag name to the PostResponse
            postResponse.getTags().add(tagName);
        }

        // Return the list of PostResponse
        return new ArrayList<>(postResponseMap.values());
    }

    public void deletePost(Long postId) {
        // Check if the post exists
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        // Delete the post
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

    private PostResponse mapToPostResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getContent(),
                post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()),  // Only tag names
                post.getCreatedAt(),
                post.getUser().getId()
        );
    }


}
