package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {

    private String content;
    private Set<String> tags;
    private Long trainingProgramId;
}
