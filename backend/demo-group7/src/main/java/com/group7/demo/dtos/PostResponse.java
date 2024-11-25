package com.group7.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    private Long id;
    private String content;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private String username;
    private TrainingProgramResponse trainingProgram;
    private int likeCount;
    private boolean isLiked;
    private boolean isBookmarked;
}
