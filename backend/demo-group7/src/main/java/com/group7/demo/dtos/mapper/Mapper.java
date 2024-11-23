package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.models.*;
import org.springframework.stereotype.Component;

import java.util.List;
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
