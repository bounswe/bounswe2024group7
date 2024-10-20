package com.group7.demo.controllers;

import com.group7.demo.dtos.UserProfileResponse;
import com.group7.demo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<UserProfileResponse> getUserByUsername(@PathVariable String username) {
        try {
            UserProfileResponse user = userService.getUserProfile(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/{username}/follow")
    public ResponseEntity<String> followUser(@PathVariable String username, HttpServletRequest request) {
        try {
            userService.followUser(username, request);
            return ResponseEntity.ok("Successfully followed " + username);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Unfollow a user
    @DeleteMapping("/{username}/follow")
    public ResponseEntity<String> unfollowUser(@PathVariable String username, HttpServletRequest request) {
        try {
            userService.unfollowUser(username, request);
            return ResponseEntity.ok("Successfully unfollowed " + username);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{username}/followers")
    public ResponseEntity<Set<String>> getFollowers(@PathVariable String username) {
        try {
            Set<String> followers = userService.getFollowers(username);
            return ResponseEntity.ok(followers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{username}/following")
    public ResponseEntity<Set<String>> getFollowing(@PathVariable String username) {
        try {
            Set<String> following = userService.getFollowing(username);
            return ResponseEntity.ok(following);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

