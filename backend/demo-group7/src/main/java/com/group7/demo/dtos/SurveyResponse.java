package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SurveyResponse {
    private Long id;
    private String username;
    private List<String> fitnessGoals; // List of tag names
    private String fitnessLevel; // Beginner, Intermediate, Advanced
}