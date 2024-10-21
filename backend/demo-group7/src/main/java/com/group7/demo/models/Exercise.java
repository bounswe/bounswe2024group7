package com.group7.demo.models;
import com.group7.demo.models.enums.MuscleGroup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;  // Name of the exercise

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;  // Targeted muscle group

    @OneToOne(mappedBy = "exercise", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ExerciseDetail exerciseDetail;  // Link to the sets and repetitions

    @ManyToMany(mappedBy = "exercises", fetch = FetchType.LAZY)
    private List<TrainingProgram> trainingPrograms = new ArrayList<>();
}
