package com.group7.demo.repository;

import com.group7.demo.models.WorkoutExerciseWithTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseWithTrackingRepository extends JpaRepository<WorkoutExerciseWithTracking, Long> {
}
