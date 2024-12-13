package com.group7.demo.dtos;

import com.group7.demo.models.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class WorkoutExerciseWithTrackingResponse {
    private Long id;
    private int exerciseNumber;
    private Exercise exercise;
    private int repetitions;
    private int sets;
    private LocalDateTime completedAt;
    private List<Integer> completedSets;
}
