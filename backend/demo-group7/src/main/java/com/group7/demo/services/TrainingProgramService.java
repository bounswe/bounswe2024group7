package com.group7.demo.services;

import com.group7.demo.dtos.*;
import com.group7.demo.dtos.mapper.Mapper;
import com.group7.demo.exceptions.UnauthorizedException;
import com.group7.demo.models.*;
import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
import com.group7.demo.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;

    private final AuthenticationService authenticationService;

    private final TrainingProgramWithTrackingRepository trainingProgramWithTrackingRepository;
    private final WeekWithTrackingRepository weekWithTrackingRepository;
    private final WorkoutWithTrackingRepository workoutWithTrackingRepository;
    private final WorkoutExerciseWithTrackingRepository workoutExerciseWithTrackingRepository;

    private final UserRepository userRepository;
    private final UserService userService;

    private final ExerciseRepository exerciseRepository;

    private final Mapper mapper;

    @Transactional
    public TrainingProgramResponse createTrainingProgram(TrainingProgramRequest trainingProgramRequest, HttpServletRequest request) throws IllegalAccessException {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        if (!user.getRole().name().equals("TRAINER")) {
            throw new UnauthorizedException("Only trainers can create training programs.");
        }

        // Create the training program
        TrainingProgram trainingProgram = TrainingProgram.builder()
                .title(trainingProgramRequest.getTitle())
                .description(trainingProgramRequest.getDescription())
                .trainer(user)
                .type(trainingProgramRequest.getType())
                .level(trainingProgramRequest.getLevel())
                .interval(trainingProgramRequest.getInterval())
                .rating(0.0)
                .ratingCount(0)
                .build();

        // Create the weeks and workouts
        List<Week> weeks = trainingProgramRequest.getWeeks().stream()
                .map(weekRequest -> {
                    // Create the week entity
                    Week week = Week.builder()
                            .weekNumber(trainingProgramRequest.getWeeks().indexOf(weekRequest) + 1)
                            .trainingProgram(trainingProgram)
                            .build();

                    // Create workouts for the week
                    List<Workout> workouts = weekRequest.getWorkouts().stream()
                            .map(workoutRequest -> {
                                // Create the workout entity
                                Workout workout = Workout.builder()
                                        .name(workoutRequest.getName())
                                        .workoutNumber(weekRequest.getWorkouts().indexOf(workoutRequest) + 1)
                                        .week(week)
                                        .build();

                                // Create exercises for the workout
                                List<WorkoutExercise> workoutExercises = workoutRequest.getExercises().stream()
                                        .map(exerciseRequest -> {
                                            Exercise exercise = exerciseRepository.findById(exerciseRequest.getExerciseId())
                                                    .orElseThrow(() -> new IllegalArgumentException("Exercise not found with id: " + exerciseRequest.getExerciseId()));

                                            // Create the workout exercise entity
                                            WorkoutExercise workoutExercise = WorkoutExercise.builder()
                                                    .workout(workout)
                                                    .exercise(exercise)
                                                    .exerciseNumber(workoutRequest.getExercises().indexOf(exerciseRequest) + 1)
                                                    .repetitions(exerciseRequest.getRepetitions())
                                                    .sets(exerciseRequest.getSets())
                                                    .build();
                                            return workoutExercise;
                                        })
                                        .collect(Collectors.toList());

                                workout.setWorkoutExercises(workoutExercises); // Set exercises for the workout
                                return workout;
                            })
                            .collect(Collectors.toList());

                    week.setWorkouts(workouts); // Set workouts for the week
                    return week;
                })
                .collect(Collectors.toList());

        trainingProgram.setWeeks(weeks); // Set weeks for the training program

        TrainingProgram savedProgram = trainingProgramRepository.save(trainingProgram);
        return mapper.mapToTrainingProgramResponse(savedProgram);
    }

    @Transactional
    public List<TrainingProgramResponse> getAllTrainingPrograms() {
        // Fetch all training programs from the repository
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();

        // Map the list of TrainingProgram entities to TrainingProgramResponse DTOs
        return trainingPrograms.stream()
                .map(mapper::mapToTrainingProgramResponse)  // Use the mapping method to convert to response DTOs
                .collect(Collectors.toList());
    }

    @Transactional
    public TrainingProgramResponse getTrainingProgramById(Long id) {
        // Find the training program by ID, or throw an exception if not found
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + id));

        // Map the TrainingProgram entity to TrainingProgramResponse DTO
        return mapper.mapToTrainingProgramResponse(trainingProgram);
    }

    @Transactional
    public List<TrainingProgramResponse> getTrainingProgramByTrainer(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findByTrainer(user);

        return trainingPrograms.stream()
                .map(mapper::mapToTrainingProgramResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTrainingProgram(Long id, HttpServletRequest request) throws Exception {
        // Find the training program by ID, or throw an exception if not found
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + id));

        User user = authenticationService.getAuthenticatedUserInternal(request);
        if (!trainingProgram.getTrainer().equals(user)) {
            throw new UnauthorizedException("You can't delete a program you don't own");
        }

        // Delete the training program
        trainingProgramRepository.delete(trainingProgram);
    }

    @Transactional
    public TrainingProgramWithTrackingResponse joinTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training Program not found with id: " + trainingProgramId));

        // Check if the user is already actively participating in a training program of this type
        boolean hasOngoingProgram = trainingProgramWithTrackingRepository.existsByUserAndTrainingProgram_TypeAndStatus(user, trainingProgram.getType(), TrainingProgramWithTrackingStatus.ONGOING);

        if (hasOngoingProgram) {
            throw new IllegalStateException("User can participate in at most one program of type " + trainingProgram.getType());
        }

        // Create TrainingProgramWithTracking entity
        TrainingProgramWithTracking trainingProgramWithTracking = TrainingProgramWithTracking.builder()
                .user(user)
                .trainingProgram(trainingProgram)
                .joinedAt(LocalDateTime.now())
                .status(TrainingProgramWithTrackingStatus.ONGOING)
                .completedAt(null)
                .build();

        // Collect weeks
        List<WeekWithTracking> weeksWithTracking = trainingProgram.getWeeks().stream()
                .map(week -> {
                    List<WorkoutWithTracking> workoutsWithTracking = new ArrayList<>();

                    WeekWithTracking weekWithTracking = WeekWithTracking.builder()
                            .trainingProgramWithTracking(trainingProgramWithTracking)
                            .week(week)
                            .completedAt(null)
                            .workoutsWithTracking(workoutsWithTracking)
                            .build();

                    // Collect workouts for this week
                    week.getWorkouts().forEach(workout -> {
                        List<WorkoutExerciseWithTracking> exercisesWithTracking = new ArrayList<>();

                        WorkoutWithTracking workoutWithTracking = WorkoutWithTracking.builder()
                                .weekWithTracking(weekWithTracking)
                                .workout(workout)
                                .completedAt(null)
                                .workoutExercisesWithTracking(exercisesWithTracking)
                                .build();

                        // Collect exercises for this workout
                        workout.getWorkoutExercises().forEach(exercise -> {
                            WorkoutExerciseWithTracking exerciseWithTracking = WorkoutExerciseWithTracking.builder()
                                    .workoutWithTracking(workoutWithTracking)
                                    .workoutExercise(exercise)
                                    .completedAt(null)
                                    .completedSetsJSON(null)
                                    .build();

                            exercisesWithTracking.add(exerciseWithTracking);
                        });

                        workoutsWithTracking.add(workoutWithTracking);
                    });

                    return weekWithTracking;
                })
                .collect(Collectors.toList());

        trainingProgramWithTracking.setWeeksWithTracking(weeksWithTracking);
        // Save all entities in batch
        trainingProgramWithTrackingRepository.save(trainingProgramWithTracking);
        weekWithTrackingRepository.saveAll(weeksWithTracking);
        workoutWithTrackingRepository.saveAll(weeksWithTracking.stream()
                .flatMap(week -> week.getWorkoutsWithTracking().stream())
                .collect(Collectors.toList()));
        workoutExerciseWithTrackingRepository.saveAll(weeksWithTracking.stream()
                .flatMap(week -> week.getWorkoutsWithTracking().stream())
                .flatMap(workout -> workout.getWorkoutExercisesWithTracking().stream())
                .collect(Collectors.toList()));

        return mapper.mapToTrainingProgramWithTrackingResponse(trainingProgramWithTracking);
    }

    @Transactional
    public Set<String> getRegisteredUsernames(Long trainingProgramId) {
        // Fetch the training program by its ID
        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + trainingProgramId));

        // Fetch the list of participants' usernames
        return trainingProgram.getParticipants().stream()
                .map(trainingProgramWithTracking -> trainingProgramWithTracking.getUser().getUsername())
                .collect(Collectors.toSet());
    }

    @Transactional
    public List<TrainingProgramWithTrackingResponse> getJoinedTrainingPrograms(String username) {
        User user = userService.getUserByUsername(username);

        // Fetch the list of training programs the user has joined
        List<TrainingProgramWithTracking> trainingProgramsWithTracking = trainingProgramWithTrackingRepository.findByUserAndStatusNot(user, TrainingProgramWithTrackingStatus.LEFT);

        return trainingProgramsWithTracking.stream()
                .map(mapper::mapToTrainingProgramWithTrackingResponse)
                .collect(Collectors.toList());
    }

    private TrainingProgramWithTracking getOngoingUserTrainingProgram(User user, Long trainingProgramId) {
        List<TrainingProgramWithTracking> ongoingPrograms = trainingProgramWithTrackingRepository.findByUserAndTrainingProgramIdAndStatus(user, trainingProgramId, TrainingProgramWithTrackingStatus.ONGOING);

        if (ongoingPrograms.isEmpty()) {
            throw new IllegalStateException("No ongoing training program found.");
        }

        // This list can contain at most one element because of the joinTrainingProgram method
        return ongoingPrograms.get(0);

    }

    @Transactional
    public TrainingProgramWithTrackingResponse leaveTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        TrainingProgramWithTracking trainingProgramWithTracking = getOngoingUserTrainingProgram(user, trainingProgramId);
        // Mark the training program as left
        trainingProgramWithTracking.setStatus(TrainingProgramWithTrackingStatus.LEFT);
        trainingProgramWithTracking.setCompletedAt(LocalDateTime.now());

        return mapper.mapToTrainingProgramWithTrackingResponse(trainingProgramWithTrackingRepository.save(trainingProgramWithTracking));
    }

}
