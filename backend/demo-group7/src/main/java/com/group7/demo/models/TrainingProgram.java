package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group7.demo.models.enums.LocationType;
import com.group7.demo.models.enums.ProgramType;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode( exclude = {"trainer", "exercises", "participants"})
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
    @JsonIgnoreProperties("trainingPrograms")
    private User trainer;

    private String description;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("trainingProgram")
    private Set<UserTrainingProgram> participants = new HashSet<>();

}