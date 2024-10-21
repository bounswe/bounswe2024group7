package com.group7.demo.repository;

import com.group7.demo.models.TrainingProgram;
import com.group7.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {

    List<TrainingProgram> findByTrainer(User user);
}
