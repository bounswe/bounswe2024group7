package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.models.*;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class Mapper {
    private final AuthenticationService authenticationService;
    public PostResponse mapToPostResponse(Post post, HttpServletRequest request) {
        User currentUser = authenticationService.getAuthenticatedUserInternal(request);

        return PostResponse.builder()
                .id(post.getId())
                .content(post.getContent())
                .tags(post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .createdAt(post.getCreatedAt())
                .username(post.getUser().getUsername())
                .trainingProgram(post.getTrainingProgram() == null ? null : mapToTrainingProgramResponse(post.getTrainingProgram()))
                .likeCount(post.getLikedByUsers() == null ? 0 : post.getLikedByUsers().size())
                .isLiked(currentUser != null && post.getLikedByUsers() != null && post.getLikedByUsers().contains(currentUser))
                .isBookmarked(currentUser != null && post.getBookmarkedByUsers() != null && post.getBookmarkedByUsers().contains(currentUser))
                .build();
    }

    public TrainingProgramResponse mapToTrainingProgramResponse(TrainingProgram program) {
        return TrainingProgramResponse.builder()
                .id(program.getId())
                .title(program.getTitle())
                .description(program.getDescription())
                .trainerUsername(program.getTrainer().getUsername())
                .createdAt(program.getCreatedAt())
                .exercises(program.getExercises().stream()
                        .map(this::mapToExerciseDetailResponse)
                        .collect(Collectors.toList()))
                .participants(program.getParticipants() == null ?
                        List.of() :
                        program.getParticipants().stream()
                                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                                .collect(Collectors.toList()))
                .build();
    }

    public ExerciseDetail mapToExerciseDetailResponse(TrainingProgramExercise trainingProgramExercise) {
        return ExerciseDetail.builder()
                .exercise(trainingProgramExercise.getExercise())
                .repetitions(trainingProgramExercise.getRepetitions())
                .sets(trainingProgramExercise.getSets())
                .build();
    }
}
