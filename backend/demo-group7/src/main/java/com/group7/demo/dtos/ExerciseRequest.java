package com.group7.demo.dtos;

import com.group7.demo.models.enums.MuscleGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class ExerciseRequest {

    private String name;  // Name of the exercise
    private MuscleGroup muscleGroup;  // Enum for muscle groups
    private Integer sets;  // Number of sets
    private Integer repetitions;  // Number of repetitions per set
}
