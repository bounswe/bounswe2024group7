package com.group7.demo.dtos;

import com.group7.demo.models.enums.BodyPart;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FeedbackResponse {

    private Long id;

    private String trainingProgramTitle; // Training Program's title

    private String username; // User's username

    private BodyPart bodyPart;

    private int weekNumber;

    private int workoutNumber;

    private int exerciseNumber;

    private String feedbackText;

    private LocalDateTime createdAt;
}
