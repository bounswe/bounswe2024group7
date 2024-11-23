package com.group7.demo.models;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTrainingProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_program_id", nullable = false)
    private TrainingProgram trainingProgram;

    private boolean completed;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String exerciseProgress; // JSON progress tracking

    private LocalDateTime joinedAt;

    // Deserialize the JSON string into a Map
    public Map<Long, Boolean> getExerciseProgress() {
        if (exerciseProgress == null) {
            return new HashMap<>(); // return empty map if no progress is available
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(exerciseProgress, new TypeReference<Map<Long, Boolean>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return new HashMap<>(); // return empty map on error
        }
    }

}
