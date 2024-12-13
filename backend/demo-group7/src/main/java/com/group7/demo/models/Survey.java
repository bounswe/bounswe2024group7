package com.group7.demo.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link the survey to a user

    @Column(nullable = false)
    private String fitnessGoal; // e.g., Weight Loss, Muscle Building

    @Column(nullable = false)
    private String fitnessLevel; // e.g., Beginner, Intermediate, Advanced

    @Column(nullable = false)
    private String workoutPreference; // e.g., Gym, Home, Outdoor

    @Column(nullable = true)
    private String availability; // e.g., Weekdays, Weekends, Morning, Evening
}
