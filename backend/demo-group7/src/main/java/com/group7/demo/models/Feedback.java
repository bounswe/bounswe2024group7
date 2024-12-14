package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group7.demo.models.enums.BodyPart;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "training_program_id")
    private TrainingProgram trainingProgram;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"followers", "following", "posts"})
    private User user;

    @Enumerated(EnumType.STRING)
    private BodyPart bodyPart;

    private int weekNumber;

    private int workoutNumber;

    private int exerciseNumber;

    @Column(columnDefinition = "TEXT")
    private String feedbackText;

    private LocalDateTime createdAt;

    @PrePersist
    private void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}