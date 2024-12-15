package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import com.group7.demo.models.enums.ProgramType;
import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class TrainingProgramWithTrackingResponse {
    private Long id;
    private String title;
    private String description;
    private String trainer;
    private ProgramType type;
    private ProgramLevel level;
    private int interval;
    private double rating;
    private int ratingCount;
    private LocalDateTime createdAt;
    private TrainingProgramWithTrackingStatus status;
    private LocalDateTime joinedAt;
    private LocalDateTime completedAt;
    private LocalDate lastCompletedWorkoutDate;
    private List<WeekWithTrackingResponse> weeks;
    private Set<String> participants;
}
