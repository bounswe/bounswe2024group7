package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class WorkoutResponse {
    private Long id;
    private String name;
    private int workoutNumber;
    private List<WorkoutExerciseResponse> workoutExercises;
}