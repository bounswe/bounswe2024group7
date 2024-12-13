package com.group7.demo.models;

import com.group7.demo.models.enums.ProgramLevel;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "surveys")
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

    @ManyToMany
    @JoinTable(
            name = "survey_tags",
            joinColumns = @JoinColumn(name = "survey_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> fitnessGoals; // Tags associated with the survey

    @Column(nullable = false)
    private ProgramLevel fitnessLevel; // e.g., Beginner, Intermediate, Advanced


}
