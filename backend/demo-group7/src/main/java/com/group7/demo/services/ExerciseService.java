package com.group7.demo.services;

import com.group7.demo.dtos.ExerciseProgress;
import com.group7.demo.dtos.ExerciseProgressResponse;
import com.group7.demo.models.Exercise;
import com.group7.demo.models.User;
import com.group7.demo.models.WorkoutExerciseWithTracking;
import com.group7.demo.repository.ExerciseRepository;
import com.group7.demo.repository.WorkoutExerciseWithTrackingRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final WorkoutExerciseWithTrackingRepository workoutExerciseWithTrackingRepository;

    private final AuthenticationService authenticationService;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise getExercise(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exercise not found with id: " + id));
    }

    public ExerciseProgressResponse getUserExerciseProgress(Long exerciseId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        Exercise exercise = getExercise(exerciseId);

        List<WorkoutExerciseWithTracking> exercisesWithTracking = workoutExerciseWithTrackingRepository
                .findAllByWorkoutExercise_Exercise_IdAndWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTracking_User(exerciseId, user);

        // Filter out entries with null completedAt and group by completedDate
        Map<LocalDate, List<WorkoutExerciseWithTracking>> groupedByDate = exercisesWithTracking.stream()
                .filter(e -> e.getCompletedAt() != null)
                .collect(Collectors.groupingBy(e -> e.getCompletedAt().toLocalDate()));


        // Map the grouped entries to ExerciseProgressResponse objects
        List<ExerciseProgress> exerciseProgresses = groupedByDate.entrySet().stream()
                .map(entry -> ExerciseProgress.builder()
                        .completedDate(entry.getKey())
                        .completedCount(entry.getValue().stream()
                                .flatMap(e -> e.getCompletedSets().stream())
                                .mapToInt(Integer::intValue)
                                .sum())
                        .build())
                .sorted(Comparator.comparing(ExerciseProgress::getCompletedDate))
                .toList();

        return ExerciseProgressResponse.builder()
                .exercise(exercise)
                .progress(exerciseProgresses)
                .build();
    }
}
