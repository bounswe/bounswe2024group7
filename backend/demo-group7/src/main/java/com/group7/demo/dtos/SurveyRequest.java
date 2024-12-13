package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import lombok.Data;

import java.util.List;

@Data
public class SurveyRequest {
    private Long userId;
    private List<String> fitnessGoals;
    private ProgramLevel fitnessLevel;
}
