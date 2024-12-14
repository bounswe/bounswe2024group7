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
public class WeekWithTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_program_with_tracking_id", nullable = false)
    private TrainingProgramWithTracking trainingProgramWithTracking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id", nullable = false)
    private Week week;

    @OneToMany(mappedBy = "weekWithTracking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WorkoutWithTracking> workoutsWithTracking;

    private LocalDateTime completedAt;
}
