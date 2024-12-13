package com.group7.demo.models;

import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
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
public class TrainingProgramWithTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_program_id", nullable = false)
    private TrainingProgram trainingProgram;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrainingProgramWithTrackingStatus status;

    @OneToMany(mappedBy = "trainingProgramWithTracking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WeekWithTracking> weeksWithTracking;

    private LocalDateTime joinedAt;
    private LocalDateTime completedAt;
}
