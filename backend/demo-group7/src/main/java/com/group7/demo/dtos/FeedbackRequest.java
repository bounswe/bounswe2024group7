package com.group7.demo.dtos;

import com.group7.demo.models.enums.BodyPart;
import lombok.Data;

@Data
public class FeedbackRequest {

    private Long trainingProgramId;

    private Long userId;

    private BodyPart bodyPart;

    private int weekNumber;

    private int workoutNumber;

    private int exerciseNumber;

    private String feedbackText;
}