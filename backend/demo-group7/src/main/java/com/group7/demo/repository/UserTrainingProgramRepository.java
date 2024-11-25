package com.group7.demo.repository;

import com.group7.demo.models.User;
import com.group7.demo.models.UserTrainingProgram;
import com.group7.demo.models.enums.UserTrainingProgramStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTrainingProgramRepository extends JpaRepository<UserTrainingProgram, Long> {
    boolean existsByUserAndTrainingProgramIdAndStatus(User user, Long trainingProgramId, UserTrainingProgramStatus status);
    List<UserTrainingProgram> findByUserAndTrainingProgramIdAndStatus(User user, Long trainingProgramId, UserTrainingProgramStatus status);
    List<UserTrainingProgram> findByUser(User user);

}
