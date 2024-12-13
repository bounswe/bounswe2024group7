package com.group7.demo.models;

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
public class WorkoutWithTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_with_tracking_id", nullable = false)
    private WeekWithTracking weekWithTracking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @OneToMany(mappedBy = "workoutWithTracking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WorkoutExerciseWithTracking> workoutExercisesWithTracking;

    private LocalDateTime completedAt;
}
