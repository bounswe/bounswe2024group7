package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.group7.demo.models.enums.ProgramLevel;
import com.group7.demo.models.enums.ProgramType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private User trainer;

    private double rating;

    private int ratingCount;

    private ProgramType type;

    private ProgramLevel level;

    private int interval;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Week> weeks;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "trainingProgram", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("trainingProgram")
    private Set<TrainingProgramWithTracking> participants = new HashSet<>();
}