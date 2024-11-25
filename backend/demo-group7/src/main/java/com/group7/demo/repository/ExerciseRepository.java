package com.group7.demo.repository;

import com.group7.demo.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByName(String name);

    @Query("SELECT DISTINCT e FROM Exercise e " +
            "LEFT JOIN e.instructions i " +
            "WHERE " +
            "LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.bodyPart) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.targetMuscle) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(e.equipment) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(i) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Exercise> search(@Param("query") String query);

}
