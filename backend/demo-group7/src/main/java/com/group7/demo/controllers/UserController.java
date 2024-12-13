package com.group7.demo.controllers;

import com.group7.demo.dtos.UserProfileResponse;
import com.group7.demo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<UserProfileResponse> getUserByUsername(@PathVariable String username, HttpServletRequest request) {
        UserProfileResponse user = userService.getUserProfile(username, request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{username}/follow")
    public ResponseEntity<String> followUser(@PathVariable String username, HttpServletRequest request) {
        userService.followUser(username, request);
        return ResponseEntity.ok("Successfully followed " + username);
    }

    // Unfollow a user
    @DeleteMapping("/{username}/follow")
    public ResponseEntity<String> unfollowUser(@PathVariable String username, HttpServletRequest request) {
        userService.unfollowUser(username, request);
        return ResponseEntity.ok("Successfully unfollowed " + username);
    }

    @GetMapping("/{username}/followers")
    public ResponseEntity<Set<String>> getFollowers(@PathVariable String username) {
        Set<String> followers = userService.getFollowers(username);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{username}/following")
    public ResponseEntity<Set<String>> getFollowing(@PathVariable String username) {
        Set<String> following = userService.getFollowing(username);
        return ResponseEntity.ok(following);
    }


}

