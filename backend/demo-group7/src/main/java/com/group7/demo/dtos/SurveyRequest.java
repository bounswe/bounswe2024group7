package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import lombok.Data;

import java.util.List;

@Data
public class SurveyRequest {
    private String username; // Username of the user
    private List<String> fitnessGoals; // List of tag names
    private String fitnessLevel; // Beginner, Intermediate, Advanced
}