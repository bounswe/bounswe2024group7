package com.group7.demo.dtos;

import com.group7.demo.models.enums.MuscleGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ExerciseResponse {
    private String name;
    private MuscleGroup muscleGroup;
    private ExerciseDetailResponse exerciseDetail;

    // Getters, setters, and builder...
}
