package com.group7.demo.repository;

import com.group7.demo.models.TrainingProgramWithTracking;
import com.group7.demo.models.User;
import com.group7.demo.models.enums.ProgramType;
import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingProgramWithTrackingRepository extends JpaRepository<TrainingProgramWithTracking, Long> {
    boolean existsByUserAndTrainingProgramIdAndStatus(User user, Long trainingProgramId, TrainingProgramWithTrackingStatus status);
    boolean existsByUserAndTrainingProgram_TypeAndStatus(User user, ProgramType type, TrainingProgramWithTrackingStatus status);
    List<TrainingProgramWithTracking> findByUserAndTrainingProgramIdAndStatus(User user, Long trainingProgramId, TrainingProgramWithTrackingStatus status);
    List<TrainingProgramWithTracking> findByUser(User user);
    List<TrainingProgramWithTracking> findByUserAndStatusNot(User user, TrainingProgramWithTrackingStatus status);


}
