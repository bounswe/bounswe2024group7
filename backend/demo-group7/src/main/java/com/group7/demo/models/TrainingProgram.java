package com.group7.demo.models;

import com.group7.demo.models.enums.LocationType;
import com.group7.demo.models.enums.ProgramType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TrainingProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private ProgramType programType; // GROUP or INDIVIDUAL

    @Enumerated(EnumType.STRING)
    private LocationType locationType; // HOME, GYM, OUTDOOR

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "training_program_exercise",  // Name of the join table
            joinColumns = @JoinColumn(name = "training_program_id"),  // Foreign key to TrainingProgram
            inverseJoinColumns = @JoinColumn(name = "exercise_id")    // Foreign key to Exercise
    )    private List<Exercise> exercises;  // Exercises linked to the training program

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User trainer;

    private String description;  // Optional description of the program
}