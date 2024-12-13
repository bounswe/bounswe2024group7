package com.group7.demo.dtos;

import com.group7.demo.models.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ExerciseProgressResponse {
    private Exercise exercise;
    private List<ExerciseProgress> progress;
}
