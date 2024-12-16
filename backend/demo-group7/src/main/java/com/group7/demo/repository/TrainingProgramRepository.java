package com.group7.demo.repository;

import com.group7.demo.models.TrainingProgram;
import com.group7.demo.models.User;
import com.group7.demo.models.enums.ProgramLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {

    List<TrainingProgram> findByTrainer(User user);

    @Query("SELECT t FROM TrainingProgram t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<TrainingProgram> search(@Param("query") String query);

    @Query("SELECT t FROM TrainingProgram t " +
           "WHERE t.level = :fitnessLevel " +
           "ORDER BY SIZE(t.participants) DESC, t.rating DESC")
    Page<TrainingProgram> findRecommendedPrograms(
            @Param("fitnessLevel") ProgramLevel fitnessLevel,
            Pageable pageable);

    Page<TrainingProgram> findAllByOrderByParticipantsDesc(Pageable pageable);
}
