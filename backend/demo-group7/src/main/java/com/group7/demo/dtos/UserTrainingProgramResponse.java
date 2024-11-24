package com.group7.demo.dtos;

import com.group7.demo.models.enums.UserTrainingProgramStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UserTrainingProgramResponse {
    private Long id;
    private String title;
    private List<UserExerciseDetail> exercises;
    private String description;
    private String trainerUsername;
    private List<String> participants;
    private UserTrainingProgramStatus status;
    private LocalDateTime createdAt;
}
