package com.group7.demo.repository;

import com.group7.demo.models.User;
import com.group7.demo.models.UserTrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTrainingProgramRepository extends JpaRepository<UserTrainingProgram, Long> {
    List<UserTrainingProgram> findAllByUserAndTrainingProgramId(User user, Long trainingProgramId);
    Optional<UserTrainingProgram> findByUserIdAndTrainingProgramId(Long userId, Long programId);

    List<UserTrainingProgram> findByUser(User user);

}
