package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class TrainingProgramResponse {
    private Long id;
    private String title;
    private List<ExerciseDetail> exercises;
    private String description;
    private String trainerUsername;
    private Set<String> participants;
    private LocalDateTime createdAt;
}