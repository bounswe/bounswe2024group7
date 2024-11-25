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
            @RequestParam(required = false) Set<String> tags, HttpServletRequest request) {

        List<PostResponse> posts;

        if (tags != null) {
            posts = postService.getPostsByTags(tags, request);
        } else {
            posts = postService.getAllPosts(request);
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<PostResponse>> getPostsByUser(@PathVariable String username, HttpServletRequest request) {
        try {
            List<PostResponse> posts = postService.getPostsByUser(username, request);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
            @RequestParam(defaultValue = "10") int count, HttpServletRequest request) {
        List<PostResponse> randomPosts = postService.getRandomPosts(count, request);
        return ResponseEntity.ok(randomPosts);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable Long postId, HttpServletRequest request) {
        postService.likePost(postId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<Void> unlikePost(@PathVariable Long postId, HttpServletRequest request) {
        postService.unlikePost(postId, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/bookmark")
    public ResponseEntity<Void> bookmarkPost(@PathVariable Long postId, HttpServletRequest request) {
        postService.bookmarkPost(postId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/bookmark")
    public ResponseEntity<Void> unbookmarkPost(@PathVariable Long postId, HttpServletRequest request) {
        postService.unbookmarkPost(postId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookmarked")
    public ResponseEntity<List<PostResponse>> getBookmarkedPosts(HttpServletRequest request) {
        List<PostResponse> bookmarkedPosts = postService.getBookmarkedPosts(request);
        return ResponseEntity.ok(bookmarkedPosts);
    }

}

