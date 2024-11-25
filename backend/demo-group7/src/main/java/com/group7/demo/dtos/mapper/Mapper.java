package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.models.*;
import com.group7.demo.models.enums.UserTrainingProgramStatus;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
                .imageUrl(post.getImageUrl())
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
                        .sorted(Comparator.comparing(ExerciseDetail::getId))
                        .collect(Collectors.toList()))
                .participants(program.getParticipants() == null ?
                        Set.of() :
                        program.getParticipants().stream()
                                .filter(participant -> participant.getStatus() == UserTrainingProgramStatus.ONGOING)
                                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                                .collect(Collectors.toSet()))
                .build();
    }

    public ExerciseDetail mapToExerciseDetailResponse(TrainingProgramExercise trainingProgramExercise) {
        return ExerciseDetail.builder()
                .id(trainingProgramExercise.getId())
                .exercise(trainingProgramExercise.getExercise())
                .repetitions(trainingProgramExercise.getRepetitions())
                .sets(trainingProgramExercise.getSets())
                .build();
    }

    public UserTrainingProgramResponse mapToUserTrainingProgramResponse(UserTrainingProgram userTrainingProgram) {
        TrainingProgram program = userTrainingProgram.getTrainingProgram();
        Map<Long, Boolean> completedExercises = userTrainingProgram.getExerciseProgress(); // Now returns Map<Long, Boolean>

        // Use the new mapper function for exercises
        List<UserExerciseDetail> exerciseDetails = program.getExercises().stream()
                .map(exercise -> mapToUserExerciseDetailResponse(exercise, completedExercises))
                .sorted(Comparator.comparing(UserExerciseDetail::getId))
                .collect(Collectors.toList());

        return UserTrainingProgramResponse.builder()
                .id(program.getId())
                .title(program.getTitle())
                .description(program.getDescription())
                .trainerUsername(program.getTrainer().getUsername())
                .participants(program.getParticipants().stream()
                        .filter(participant -> participant.getStatus() == UserTrainingProgramStatus.ONGOING)
                        .map(participant -> participant.getUser().getUsername())
                        .collect(Collectors.toSet()))
                .exercises(exerciseDetails)
                .status(userTrainingProgram.getStatus())
                .joinedAt(userTrainingProgram.getJoinedAt())
                .completedAt(userTrainingProgram.getCompletedAt())
                .build();
    }

    public UserExerciseDetail mapToUserExerciseDetailResponse(TrainingProgramExercise trainingProgramExercise, Map<Long, Boolean> completedExercises) {
        return UserExerciseDetail.builder()
                .id(trainingProgramExercise.getId())
                .exercise(trainingProgramExercise.getExercise())
                .repetitions(trainingProgramExercise.getRepetitions())
                .sets(trainingProgramExercise.getSets())
                .completed(completedExercises.getOrDefault(trainingProgramExercise.getId(), false)) // Use `getOrDefault` to handle missing keys
                .build();
    }
}
