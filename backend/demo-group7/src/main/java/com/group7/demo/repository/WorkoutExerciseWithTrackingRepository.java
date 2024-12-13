package com.group7.demo.repository;

import com.group7.demo.models.User;
import com.group7.demo.models.WorkoutExerciseWithTracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutExerciseWithTrackingRepository extends JpaRepository<WorkoutExerciseWithTracking, Long> {
    List<WorkoutExerciseWithTracking> findAllByWorkoutExercise_Exercise_IdAndWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTracking_User(Long exerciseId, User user);
}
