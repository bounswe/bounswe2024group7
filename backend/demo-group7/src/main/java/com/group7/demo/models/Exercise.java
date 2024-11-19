package com.group7.demo.models;
import com.group7.demo.models.enums.BodyPart;
import com.group7.demo.models.enums.Equipment;
import com.group7.demo.models.enums.TargetMuscle;
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
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String gifUrl;

    @Enumerated(EnumType.STRING)
    private BodyPart bodyPart;

    @Enumerated(EnumType.STRING)
    private TargetMuscle targetMuscle;

    @Enumerated(EnumType.STRING)
    private Equipment equipment;

    @ElementCollection
    @CollectionTable(name = "exercise_instructions", joinColumns = @JoinColumn(name = "exercise_id"))
    @Column(name = "instruction")
    private List<String> instructions;

    @ElementCollection(targetClass = TargetMuscle.class)
    @CollectionTable(name = "exercise_secondary_muscles", joinColumns = @JoinColumn(name = "exercise_id"))
    @Enumerated(EnumType.STRING)
    private List<TargetMuscle> secondaryMuscles;
}
