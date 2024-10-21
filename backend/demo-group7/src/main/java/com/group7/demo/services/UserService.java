package com.group7.demo.services;

import com.group7.demo.dtos.UserProfileResponse;
import com.group7.demo.models.User;
import com.group7.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public UserProfileResponse getUserProfile(String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));

        Set<String> followers = user.getFollowers()
                .stream()
                .map(User::getUsername)
                .collect(Collectors.toSet());

        Set<String> following = user.getFollowing()
                .stream()
                .map(User::getUsername)
                .collect(Collectors.toSet());

        return UserProfileResponse.builder()
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole())
                .followers(followers)
                .following(following)
                .build();
    }

    public void followUser(String usernameToFollow, HttpServletRequest request) throws Exception {
        User authenticatedUser = authenticationService.getAuthenticatedUserInternal(request);
        User userToFollow = userRepository.findByUsername(usernameToFollow)
                .orElseThrow(() -> new Exception("Entity not found"));

        if (!authenticatedUser.getUsername().equals(usernameToFollow) && !authenticatedUser.getFollowing().contains(userToFollow)) {
            authenticatedUser.getFollowing().add(userToFollow);
            userToFollow.getFollowers().add(authenticatedUser);
            userRepository.save(authenticatedUser);
            userRepository.save(userToFollow);
        } else {
            throw new Exception("You already follow this user");
        }
    }

    public void unfollowUser(String usernameToUnfollow, HttpServletRequest request) throws Exception {
        User authenticatedUser = authenticationService.getAuthenticatedUserInternal(request);
        User userToUnfollow = userRepository.findByUsername(usernameToUnfollow)
                .orElseThrow(() -> new Exception("Entity not found"));

        if (authenticatedUser.getFollowing().contains(userToUnfollow)) {
            authenticatedUser.getFollowing().remove(userToUnfollow);
            userToUnfollow.getFollowers().remove(authenticatedUser);
            userRepository.save(authenticatedUser);
            userRepository.save(userToUnfollow);
        } else {
            throw new Exception("You don't follow this user");
        }
    }

    public Set<String> getFollowers(String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));
        return user.getFollowers().stream()
                .map(User::getUsername)
                .collect(Collectors.toSet());
    }

    public Set<String> getFollowing(String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));
        return user.getFollowing().stream()
                .map(User::getUsername)
                .collect(Collectors.toSet());
    }

}
