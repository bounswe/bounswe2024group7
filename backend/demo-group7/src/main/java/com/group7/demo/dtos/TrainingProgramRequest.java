package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
public class TrainingProgramRequest {
    private String title;
    private List<ExerciseDto> exercises;
    private String description;


    @Data
    @AllArgsConstructor
    public static class ExerciseDto {
        private Long id;
        private int repetitions;
        private int sets;
    }
}