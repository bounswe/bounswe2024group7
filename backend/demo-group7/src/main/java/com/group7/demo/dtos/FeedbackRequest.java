package com.group7.demo.dtos;

import com.group7.demo.models.enums.FeedbackMuscle;
import lombok.Data;

@Data
public class FeedbackRequest {

    private Long trainingProgramId;

    private FeedbackMuscle feedbackMuscle;

    private int weekNumber;

    private int workoutNumber;

    private int exerciseNumber;

    private String feedbackText;
}