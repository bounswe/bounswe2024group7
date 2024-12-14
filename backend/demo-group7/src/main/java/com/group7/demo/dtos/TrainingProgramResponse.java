package com.group7.demo.dtos;

import com.group7.demo.models.enums.ProgramLevel;
import com.group7.demo.models.enums.ProgramType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class TrainingProgramResponse {
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
    private List<WeekResponse> weeks;
    private Set<String> participants;
}
