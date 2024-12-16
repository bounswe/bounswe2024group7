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
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramRatingRepository trainingProgramRatingRepository;

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
    public TrainingProgramWithTrackingResponse getTrainingProgramWithTracking(Long trackingId){
        TrainingProgramWithTracking trainingProgramWithTracking = trainingProgramWithTrackingRepository.findById(trackingId)
                .orElseThrow(() -> new EntityNotFoundException("Training program with tracking not found with tracking id: " + trackingId));
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

    public TrainingProgramWithTrackingResponse getOngoingUserTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        List<TrainingProgramWithTracking> ongoingPrograms = trainingProgramWithTrackingRepository.findByUserAndTrainingProgramIdAndStatus(user, trainingProgramId, TrainingProgramWithTrackingStatus.ONGOING);

        if (ongoingPrograms.isEmpty()) {
            throw new IllegalStateException("No ongoing training program found.");
        }

        // This list can contain at most one element because of the joinTrainingProgram method
        TrainingProgramWithTracking trainingProgramWithTracking = ongoingPrograms.get(0);
        return mapper.mapToTrainingProgramWithTrackingResponse(trainingProgramWithTracking);
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

    @Transactional
    public TrainingProgramWithTrackingResponse completeExercise(Long trainingProgramId, Long workoutExerciseId, HttpServletRequest request, List<Integer> completedSets) {
        // Get the authenticated user
        User user = authenticationService.getAuthenticatedUserInternal(request);

        // Retrieve the training program with tracking for the user
        TrainingProgramWithTracking trainingProgramWithTracking = getOngoingUserTrainingProgram(user, trainingProgramId);

        // Retrieve the WorkoutExerciseWithTracking entity
        WorkoutExerciseWithTracking workoutExerciseWithTracking = workoutExerciseWithTrackingRepository
                .findByWorkoutWithTracking_WeekWithTracking_TrainingProgramWithTrackingAndWorkoutExercise_Id(
                        trainingProgramWithTracking, workoutExerciseId)
                .orElseThrow(() -> new EntityNotFoundException("Workout exercise not found with the specified ID in the training program."));

        // Check if the exercise is already completed
        if (workoutExerciseWithTracking.getCompletedAt() != null) {
            throw new IllegalStateException("This workout exercise has already been completed.");
        }

        if (completedSets.size() != workoutExerciseWithTracking.getWorkoutExercise().getSets()) {
            throw new IllegalArgumentException("Number of completed sets does not match the required number of sets for the exercise.");
        }

        WorkoutWithTracking currentWorkout = getCurrentWorkout(trainingProgramWithTracking);
        if (!currentWorkout.equals(workoutExerciseWithTracking.getWorkoutWithTracking())) {
            throw new IllegalStateException("You can't complete this exercise without completing previous workouts.");
        }

        // Update completed sets and mark the exercise as completed
        workoutExerciseWithTracking.setCompletedSets(completedSets);
        workoutExerciseWithTracking.setCompletedAt(LocalDateTime.now());
        workoutExerciseWithTrackingRepository.save(workoutExerciseWithTracking);

        // Check if all exercises in the workout are completed, and update workout tracking
        WorkoutWithTracking workoutWithTracking = workoutExerciseWithTracking.getWorkoutWithTracking();
        boolean allExercisesCompleted = workoutWithTracking.getWorkoutExercisesWithTracking().stream()
                .allMatch(exercise -> exercise.getCompletedAt() != null);

        if (allExercisesCompleted && workoutWithTracking.getCompletedAt() == null) {
            workoutWithTracking.setCompletedAt(LocalDateTime.now());
            workoutWithTrackingRepository.save(workoutWithTracking);
        }

        // Check if all workouts in the week are completed, and update week tracking
        WeekWithTracking weekWithTracking = workoutWithTracking.getWeekWithTracking();
        boolean allWorkoutsCompleted = weekWithTracking.getWorkoutsWithTracking().stream()
                .allMatch(workout -> workout.getCompletedAt() != null);

        if (allWorkoutsCompleted && weekWithTracking.getCompletedAt() == null) {
            weekWithTracking.setCompletedAt(LocalDateTime.now());
            weekWithTrackingRepository.save(weekWithTracking);
        }

        // Check if all weeks in the program are completed, and update program tracking
        boolean allWeeksCompleted = trainingProgramWithTracking.getWeeksWithTracking().stream()
                .allMatch(week -> week.getCompletedAt() != null);

        if (allWeeksCompleted && trainingProgramWithTracking.getCompletedAt() == null) {
            trainingProgramWithTracking.setCompletedAt(LocalDateTime.now());
            trainingProgramWithTracking.setStatus(TrainingProgramWithTrackingStatus.COMPLETED);
            trainingProgramWithTrackingRepository.save(trainingProgramWithTracking);
        }

        return mapper.mapToTrainingProgramWithTrackingResponse(trainingProgramWithTracking);
    }

    private WorkoutWithTracking getCurrentWorkout(TrainingProgramWithTracking trainingProgramWithTracking) {
        return trainingProgramWithTracking.getWeeksWithTracking().stream()
                .filter(week -> week.getCompletedAt() == null)
                .flatMap(week -> week.getWorkoutsWithTracking().stream())
                .filter(workout -> workout.getCompletedAt() == null)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("All workouts are completed in the training program."));
    }

    public Map<Long, Double> getCompletionRatesForProgram(Long programTrackingId) {
// Fetch the TrainingProgramWithTracking
        TrainingProgramWithTracking programTracking = trainingProgramWithTrackingRepository
                .findById(programTrackingId)
                .orElseThrow(() -> new IllegalArgumentException("Training program tracking not found"));

        // Map to store completion rates for each week
        Map<Long, Double> weeklyCompletionRates = new HashMap<>();

        // Iterate over weeks in the training program
        for (WeekWithTracking weekWithTracking : programTracking.getWeeksWithTracking()) {
            int totalExercises = 0;
            int completedExercises = 0;

            // Iterate over workouts in the week
            for (WorkoutWithTracking workoutWithTracking : weekWithTracking.getWorkoutsWithTracking()) {
                // Iterate over exercises in the workout
                for (WorkoutExerciseWithTracking exerciseTracking : workoutWithTracking.getWorkoutExercisesWithTracking()) {
                    totalExercises++;
                    if (exerciseTracking.getCompletedAt() != null) {
                        completedExercises++;
                    }
                }
            }

            // Calculate completion rate for the week
            double completionRate = totalExercises == 0 ? 0.0 : (double) completedExercises / totalExercises * 100;
            weeklyCompletionRates.put(weekWithTracking.getWeek().getId(), completionRate);
        }

        return weeklyCompletionRates;
    }

    public void rateTrainingProgram(Long trainingProgramId, Long userId, int rating) {
        // Validate the rating value
        if (rating < 0 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Ensure the user is a participant
        boolean isParticipant = trainingProgramWithTrackingRepository.existsByTrainingProgramIdAndUserId(trainingProgramId, userId);
        if (!isParticipant) {
            throw new IllegalArgumentException("Only participants can rate the training program");
        }

        // Fetch the training program
        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new IllegalArgumentException("Training program not found"));

        // Check if the user has already rated the program
        Optional<TrainingProgramRating> existingRatingOpt = trainingProgramRatingRepository.findByTrainingProgramIdAndUserId(trainingProgramId, userId);

        if (existingRatingOpt.isPresent()) {
            // Update the existing rating
            TrainingProgramRating existingRating = existingRatingOpt.get();
            int oldRating = existingRating.getRating();
            existingRating.setRating(rating);
            trainingProgramRatingRepository.save(existingRating);

            // Adjust the program's average rating
            updateAverageRating(trainingProgram, oldRating, rating, false);
        } else {
            // Add a new rating
            TrainingProgramRating newRating = TrainingProgramRating.builder()
                    .trainingProgram(trainingProgram)
                    .user(user)
                    .rating(rating)
                    .build();
            trainingProgramRatingRepository.save(newRating);

            // Adjust the program's average rating
            updateAverageRating(trainingProgram, 0, rating, true);
        }
    }

    private void updateAverageRating(TrainingProgram trainingProgram, int oldRating, int newRating, boolean isNew) {
        double totalRatingSum = trainingProgram.getRating() * trainingProgram.getRatingCount();

        if (isNew) {
            totalRatingSum += newRating;
            trainingProgram.setRatingCount(trainingProgram.getRatingCount() + 1);
        } else {
            totalRatingSum = totalRatingSum - oldRating + newRating;
        }

        trainingProgram.setRating(totalRatingSum / trainingProgram.getRatingCount());
        trainingProgramRepository.save(trainingProgram);
    }

}
