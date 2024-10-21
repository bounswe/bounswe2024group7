package com.group7.demo.controllers;

import com.group7.demo.dtos.PostRequest;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.services.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
public class PostController {
    private PostService postService;

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest, HttpServletRequest request) {
        PostResponse createdPost = postService.createPost(postRequest, request);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> fetchPosts(
            @RequestParam(required = false) Set<String> tags) {

        List<PostResponse> posts;

        if (tags != null) {
            posts = postService.getPostsByTags(tags);
            return ResponseEntity.ok(posts);
        } else {
            posts = postService.getAllPosts();
        }

        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId, HttpServletRequest request) throws IllegalAccessException {
        try {
            postService.deletePost(postId, request);
            return ResponseEntity.ok("Post deleted successfully.");
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/random")
    public ResponseEntity<List<PostResponse>> getRandomPosts(
            @RequestParam(defaultValue = "10") int count) {
        List<PostResponse> randomPosts = postService.getRandomPosts(count);
        return ResponseEntity.ok(randomPosts);
    }

}

