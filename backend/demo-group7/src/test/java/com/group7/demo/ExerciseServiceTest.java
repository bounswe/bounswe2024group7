package com.group7.demo;

import com.group7.demo.dtos.ExerciseProgress;
import com.group7.demo.dtos.ExerciseProgressResponse;
import com.group7.demo.models.Exercise;
import com.group7.demo.models.User;
import com.group7.demo.models.WorkoutExerciseWithTracking;
import com.group7.demo.repository.ExerciseRepository;
import com.group7.demo.repository.WorkoutExerciseWithTrackingRepository;
import com.group7.demo.services.AuthenticationService;
import com.group7.demo.services.ExerciseService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExerciseServiceTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private WorkoutExerciseWithTrackingRepository workoutExerciseWithTrackingRepository;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private ExerciseService exerciseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllExercises() {
        Exercise exercise1 = new Exercise();
        Exercise exercise2 = new Exercise();
        when(exerciseRepository.findAll()).thenReturn(List.of(exercise1, exercise2));

        List<Exercise> exercises = exerciseService.getAllExercises();

        assertNotNull(exercises);
        assertEquals(2, exercises.size());
        verify(exerciseRepository, times(1)).findAll();
    }

    @Test
    void testGetExercise_ValidId() {
        Exercise exercise = new Exercise();
        exercise.setId(1L);
        when(exerciseRepository.findById(1L)).thenReturn(Optional.of(exercise));

        Exercise result = exerciseService.getExercise(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(exerciseRepository, times(1)).findById(1L);
    }

    @Test
    void testGetExercise_InvalidId() {
        when(exerciseRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> exerciseService.getExercise(1L));

        assertEquals("Exercise not found with id: 1", exception.getMessage());
        verify(exerciseRepository, times(1)).findById(1L);
    }

    @Test
    void testGetUserExerciseProgress_Success() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        User mockUser = new User();
        mockUser.setId(1L);
        Exercise exercise = new Exercise();
        exercise.setId(1L);

        WorkoutExerciseWithTracking tracking1 = new WorkoutExerciseWithTracking();
        tracking1.setCompletedAt(LocalDate.now().atStartOfDay());
        tracking1.setCompletedSets(List.of(2, 3));

        WorkoutExerciseWithTracking tracking2 = new WorkoutExerciseWithTracking();
        tracking2.setCompletedAt(LocalDate.now().atStartOfDay());
        tracking2.setCompletedSets(List.of(1));

        when(authenticationService.getAuthenticatedUserInternal(request)).thenReturn(mockUser);
        when(exerciseRepository.findById(1L)).thenReturn(Optional.of(exercise));
        when(workoutExerciseWithTrackingRepository.findAllByWorkoutExercise_Exercise_IdAndWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTracking_User(1L, mockUser))
                .thenReturn(List.of(tracking1, tracking2));

        ExerciseProgressResponse response = exerciseService.getUserExerciseProgress(1L, request);

        assertNotNull(response);
        assertEquals(1L, response.getExercise().getId());
        assertEquals(1, response.getProgress().size());
        assertEquals(LocalDate.now(), response.getProgress().get(0).getCompletedDate());
        assertEquals(6, response.getProgress().get(0).getCompletedCount());
        verify(workoutExerciseWithTrackingRepository, times(1)).findAllByWorkoutExercise_Exercise_IdAndWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTracking_User(1L, mockUser);
    }

    @Test
    void testGetUserExerciseProgress_ExerciseNotFound() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        User mockUser = new User();
        mockUser.setId(1L);

        when(authenticationService.getAuthenticatedUserInternal(request)).thenReturn(mockUser);
        when(exerciseRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> exerciseService.getUserExerciseProgress(1L, request));

        assertEquals("Exercise not found with id: 1", exception.getMessage());
    }

    @Test
    void testGetUserExerciseProgress_NoTrackingData() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        User mockUser = new User();
        mockUser.setId(1L);
        Exercise exercise = new Exercise();
        exercise.setId(1L);

        when(authenticationService.getAuthenticatedUserInternal(request)).thenReturn(mockUser);
        when(exerciseRepository.findById(1L)).thenReturn(Optional.of(exercise));
        when(workoutExerciseWithTrackingRepository.findAllByWorkoutExercise_Exercise_IdAndWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTracking_User(1L, mockUser))
                .thenReturn(List.of());

        ExerciseProgressResponse response = exerciseService.getUserExerciseProgress(1L, request);

        assertNotNull(response);
        assertEquals(1L, response.getExercise().getId());
        assertTrue(response.getProgress().isEmpty());
    }
}
