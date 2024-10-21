package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ExerciseDetailRequest {

    private Integer sets;
    private Integer repetitions;
}
