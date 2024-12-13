package com.group7.demo.repository;

import com.group7.demo.models.TrainingProgramWithTracking;
import com.group7.demo.models.WorkoutExerciseWithTracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkoutExerciseWithTrackingRepository extends JpaRepository<WorkoutExerciseWithTracking, Long> {
    Optional<WorkoutExerciseWithTracking> findByWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTrackingAndWorkoutExercise_Id(TrainingProgramWithTracking trainingProgramWithTracking, Long workoutExerciseId);
}
