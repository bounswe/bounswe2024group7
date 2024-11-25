package com.group7.demo.dtos;

import com.group7.demo.models.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class UserExerciseDetail {
    private Long id;
    private Exercise exercise;
    private int repetitions;
    private int sets;
    private boolean completed;
    private String completedAt;
}
