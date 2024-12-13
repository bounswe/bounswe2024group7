package com.group7.demo.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExerciseWithTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_with_tracking_id", nullable = false)
    private WorkoutWithTracking workoutWithTracking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;

    private LocalDateTime completedAt;

    @Column(columnDefinition = "TEXT")
    private String completedSetsJSON;

    public void setCompletedSets(List<Integer> completedSets) {
        if (completedSets == null) {
            this.completedSetsJSON = null;
            return;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.completedSetsJSON = objectMapper.writeValueAsString(completedSets);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Error serializing completed sets to JSON", e);
        }
    }

    public List<Integer> getCompletedSets() {
        if (this.completedSetsJSON == null) {
            return null;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(this.completedSetsJSON, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Error deserializing completed sets JSON", e);
        }
    }
}
