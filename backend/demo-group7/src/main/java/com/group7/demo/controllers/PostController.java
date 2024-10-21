package com.group7.demo.controllers;

import com.group7.demo.dtos.PostRequest;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.models.Post;
import com.group7.demo.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest) {
        PostResponse createdPost = postService.createPost(postRequest);
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
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok("Post deleted successfully.");
    }

//    @GetMapping("/by-tags")
//    public ResponseEntity<List<PostResponse>> getPostsByTags(@RequestParam ) {
//
//    }
}

