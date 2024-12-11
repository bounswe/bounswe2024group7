package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutRequest {
    @NonNull
    private String name;
    @NonNull
    private List<WorkoutExerciseRequest> exercises;
}

