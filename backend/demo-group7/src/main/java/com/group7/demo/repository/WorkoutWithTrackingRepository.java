package com.group7.demo.repository;

import com.group7.demo.models.WorkoutWithTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutWithTrackingRepository extends JpaRepository<WorkoutWithTracking, Long> {
}
