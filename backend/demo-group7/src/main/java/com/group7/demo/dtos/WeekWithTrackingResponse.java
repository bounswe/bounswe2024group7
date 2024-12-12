package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class WeekWithTrackingResponse {
    private Long id;
    private int weekNumber;
    private LocalDateTime completedAt;
    private List<WorkoutWithTrackingResponse> workouts;
}
