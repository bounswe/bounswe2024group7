package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class WorkoutWithTrackingResponse {
    private Long id;
    private String name;
    private int workoutNumber;
    private LocalDateTime completedAt;
    private double completionPercentage;
    private List<WorkoutExerciseWithTrackingResponse> workoutExercises;
}
