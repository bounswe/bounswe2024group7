package com.group7.demo.services;

import com.group7.demo.dtos.PostResponse;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.dtos.UserProfileResponse;
import com.group7.demo.dtos.UserTrainingProgramResponse;
import com.group7.demo.models.User;
import com.group7.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final PostService postService;
    private final TrainingProgramService trainingProgramService;

    public UserService(UserRepository userRepository,
                       @Lazy AuthenticationService authenticationService,
                       @Lazy PostService postService,
                       @Lazy TrainingProgramService trainingProgramService) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.postService = postService;
        this.trainingProgramService = trainingProgramService;
    }

    @Transactional
    public UserProfileResponse getUserProfile(String username, HttpServletRequest request) throws Exception {
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

        List<PostResponse> posts = postService.getPostsByUser(user.getUsername(), request);
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.getTrainingProgramByTrainer(user.getUsername());
        List<UserTrainingProgramResponse> joinedPrograms = trainingProgramService.getJoinedTrainingPrograms(user.getUsername());

        return UserProfileResponse.builder()
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole())
                .followers(followers)
                .following(following)
                .posts(posts)
                .trainingPrograms(trainingPrograms)
                .joinedPrograms(joinedPrograms)
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

    public User getUserByUsername(String username) throws Exception {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));
    }

}
