package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class TrainingProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String description;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private User trainer;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL)
    private List<TrainingProgramExercise> exercises;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("trainingProgram")
    private Set<UserTrainingProgram> participants = new HashSet<>();
}