package com.group7.demo.repository;

import com.group7.demo.models.TrainingProgramRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainingProgramRatingRepository extends JpaRepository<TrainingProgramRating, Long> {
    Optional<TrainingProgramRating> findByTrainingProgramIdAndUserId(Long trainingProgramId, Long userId);
}

