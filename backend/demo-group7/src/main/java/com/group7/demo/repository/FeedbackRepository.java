package com.group7.demo.repository;

import com.group7.demo.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByTrainingProgramId(Long trainingProgramId);

    List<Feedback> findByUserId(Long userId);
}