package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExerciseRequest {
    @NonNull
    private Long exerciseId;
    @NonNull
    private int repetitions;
    @NonNull
    private int sets;
}
