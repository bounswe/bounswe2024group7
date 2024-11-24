package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.models.*;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class Mapper {
    public PostResponse mapToPostResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getContent(),
                post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()),  // Only tag names
                post.getCreatedAt(),
                post.getUser().getUsername(),
                post.getTrainingProgram() == null ? null : mapToTrainingProgramResponse(post.getTrainingProgram())
        );
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
                        List.of() :
                        program.getParticipants().stream()
                                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                                .collect(Collectors.toList()))
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
                        .map(participant -> participant.getUser().getUsername())
                        .collect(Collectors.toList()))
                .exercises(exerciseDetails)
                .status(userTrainingProgram.getStatus())
                .createdAt(program.getCreatedAt())
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
