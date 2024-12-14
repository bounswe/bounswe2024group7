package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import com.group7.demo.models.enums.ProgramType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
public class TrainingProgramRequest {
    @NonNull
    private String title;
    @NonNull
    private String description;
    @NonNull
    private ProgramType type;
    @NonNull
    private ProgramLevel level;
    @NonNull
    private int interval;
    @NonNull
    private List<WeekRequest> weeks;
}