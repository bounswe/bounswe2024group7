package com.group7.demo.dtos;

import com.group7.demo.models.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ExerciseDetail {
    private Exercise exercise;
    private int repetitions;
    private int sets;
}
