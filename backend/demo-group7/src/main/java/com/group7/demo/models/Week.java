package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Week {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int weekNumber;

    @ManyToOne
    @JoinColumn(name = "training_program_id", nullable = false)
    @JsonBackReference
    private TrainingProgram trainingProgram;

    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Workout> workouts;
}
