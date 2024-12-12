package com.group7.demo.repository;

import com.group7.demo.models.WeekWithTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeekWithTrackingRepository extends JpaRepository<WeekWithTracking, Long> {
}
