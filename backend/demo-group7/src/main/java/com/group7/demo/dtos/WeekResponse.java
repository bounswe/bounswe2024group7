package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class WeekResponse {
    private Long id;
    private int weekNumber;
    private List<WorkoutResponse> workouts;
}