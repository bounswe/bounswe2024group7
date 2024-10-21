package com.group7.demo.dtos;

import com.group7.demo.models.enums.LocationType;
import com.group7.demo.models.enums.ProgramType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
public class TrainingProgramRequest {

    private String title;
    private ProgramType programType;
    private LocationType locationType;
    private List<ExerciseRequest> exercises;
    private String description;
    private Long trainerId;  // The ID of the trainer creating the program
}