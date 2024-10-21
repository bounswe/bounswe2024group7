package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ExerciseDetailResponse {
    private Integer sets;
    private Integer repetitions;

    // Getters, setters, and builder...
}
