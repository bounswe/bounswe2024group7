package com.group7.demo.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group7.demo.dtos.*;
import com.group7.demo.dtos.mapper.Mapper;
import com.group7.demo.models.*;
import com.group7.demo.models.enums.UserTrainingProgramStatus;
import com.group7.demo.repository.ExerciseRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import com.group7.demo.repository.UserTrainingProgramRepository;
import com.group7.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;

    private final AuthenticationService authenticationService;

    private final UserTrainingProgramRepository userTrainingProgramRepository;

    private final UserRepository userRepository;
    private final UserService userService;

    private final ExerciseRepository exerciseRepository;

    private final Mapper mapper;

    @Transactional
    public TrainingProgramResponse createTrainingProgram(TrainingProgramRequest trainingProgramRequest, HttpServletRequest request) throws IllegalAccessException {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        if (!user.getRole().name().equals("TRAINER")) {
            throw new IllegalAccessException("Only trainers can create training programs.");
        }

        // Create the training program
        TrainingProgram trainingProgram = TrainingProgram.builder()
                .title(trainingProgramRequest.getTitle())
                .description(trainingProgramRequest.getDescription())
                .trainer(user)
                .createdAt(LocalDateTime.now())
                .build();

        List<TrainingProgramExercise> exercises = trainingProgramRequest.getExercises().stream()
                .map(exerciseRequest -> {
                    // Fetch the exercise from the database (assuming exerciseId is unique)
                    Exercise exercise = exerciseRepository.findById(exerciseRequest.getId())
                            .orElseThrow(() -> new IllegalArgumentException("Exercise not found with id: " + exerciseRequest.getId()));

                    // Create the TrainingProgramExercise entity
                    TrainingProgramExercise trainingProgramExercise = new TrainingProgramExercise();
                    trainingProgramExercise.setTrainingProgram(trainingProgram);  // Set the training program reference
                    trainingProgramExercise.setExercise(exercise);  // Set the exercise reference
                    trainingProgramExercise.setRepetitions(exerciseRequest.getRepetitions());  // Set repetitions
                    trainingProgramExercise.setSets(exerciseRequest.getSets());  // Set sets

                    return trainingProgramExercise;
                })
                .collect(Collectors.toList());

        // Set the exercises for the training program
        trainingProgram.setExercises(exercises);

        // Save the training program and return a response
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
            throw new IllegalAccessException("You can't delete a program you don't own");
        }

        // Delete the training program
        trainingProgramRepository.delete(trainingProgram);
    }

    @Transactional
    public UserTrainingProgramResponse joinTrainingProgram(Long trainingProgramId , HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training Program not found with id: " + trainingProgramId));

        // Check if the user is already actively participating in this training program
        boolean hasOngoingProgram = userTrainingProgramRepository.existsByUserAndTrainingProgramIdAndStatus(user, trainingProgramId, UserTrainingProgramStatus.ONGOING);

        if (hasOngoingProgram) {
            throw new IllegalStateException("User is already actively participating in this training program.");
        }

        // Initialize the progress JSON object
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Long, Boolean> exerciseProgress = trainingProgram.getExercises().stream()
                .collect(Collectors.toMap(
                        TrainingProgramExercise::getId, // Exercise ID
                        TrainingProgramExercise -> false // Not completed yet
                ));

        String progressJson;
        try {
            progressJson = objectMapper.writeValueAsString(exerciseProgress);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to initialize exercise progress JSON", e);
        }

        // Create a new UserTrainingProgram entity
        UserTrainingProgram userTrainingProgram = UserTrainingProgram.builder()
                .user(user)
                .trainingProgram(trainingProgram)
                .joinedAt(LocalDateTime.now())
                .status(UserTrainingProgramStatus.ONGOING)
                .exerciseProgress(progressJson)
                .completedAt(null)
                .build();

        // Save the UserTrainingProgram entity
        return mapper.mapToUserTrainingProgramResponse(userTrainingProgramRepository.save(userTrainingProgram));
    }

    @Transactional
    public Set<String> getRegisteredUsernames(Long trainingProgramId) {
        // Fetch the training program by its ID
        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + trainingProgramId));

        // Fetch the list of participants' usernames
        return trainingProgram.getParticipants().stream()
                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                .collect(Collectors.toSet());
    }

    // Return the list of joined training programs for the authenticated user
    @Transactional
    public List<UserTrainingProgramResponse> getJoinedTrainingPrograms(String username) throws Exception {
        // Fetch the authenticated user
        User user = userService.getUserByUsername(username);

        // Fetch the list of training programs the user has joined
        List<UserTrainingProgram> userTrainingPrograms = userTrainingProgramRepository.findByUserAndStatusNot(user, UserTrainingProgramStatus.LEFT);

        // Map the list of UserTrainingProgram entities to UserTrainingProgramResponse DTOs
        return userTrainingPrograms.stream()
                .map(mapper::mapToUserTrainingProgramResponse) // Map to UserTrainingProgramResponse instead of TrainingProgramResponse
                .collect(Collectors.toList());
    }

    private UserTrainingProgram getOngoingUserTrainingProgram(User user, Long trainingProgramId) {
        List<UserTrainingProgram> ongoingPrograms = userTrainingProgramRepository.findByUserAndTrainingProgramIdAndStatus(user, trainingProgramId, UserTrainingProgramStatus.ONGOING);

        if (ongoingPrograms.isEmpty()) {
            throw new IllegalStateException("No ongoing training program found.");
        }

        // Return the first ongoing program if available
        return ongoingPrograms.get(0);

    }

    @Transactional
    public UserTrainingProgramResponse markExerciseAsCompleted(Long trainingProgramId, Long exerciseId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        UserTrainingProgram userTrainingProgram = getOngoingUserTrainingProgram(user, trainingProgramId);

        // Get the current progress map
        Map<Long, Boolean> exerciseProgress = userTrainingProgram.getExerciseProgress();

        // Mark the exercise as completed
        exerciseProgress.put(exerciseId, true);

        // Serialize the updated exercise progress map back to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String updatedProgressJson = objectMapper.writeValueAsString(exerciseProgress);
            userTrainingProgram.setExerciseProgress(updatedProgressJson); // Save the updated JSON string
        } catch (Exception e) {
            throw new IllegalStateException("Failed to update exercise progress JSON", e);
        }

        return mapper.mapToUserTrainingProgramResponse(userTrainingProgramRepository.save(userTrainingProgram));
    }



    @Transactional
    public UserTrainingProgramResponse unmarkExerciseAsCompleted(Long trainingProgramId, Long exerciseId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        UserTrainingProgram userTrainingProgram = getOngoingUserTrainingProgram(user, trainingProgramId);

        // Get the current progress map from the serialized exerciseProgress
        Map<Long, Boolean> exerciseProgress = userTrainingProgram.getExerciseProgress();

        // Mark the exercise as incomplete (unmark)
        exerciseProgress.put(exerciseId, false);

        // Serialize the updated progress map back to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String updatedProgressJson = objectMapper.writeValueAsString(exerciseProgress);
            userTrainingProgram.setExerciseProgress(updatedProgressJson); // Save the updated JSON string
        } catch (Exception e) {
            throw new IllegalStateException("Failed to update exercise progress JSON", e);
        }

        return mapper.mapToUserTrainingProgramResponse(userTrainingProgramRepository.save(userTrainingProgram));
    }

    @Transactional
    public UserTrainingProgramResponse markTrainingProgramAsCompleted(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        UserTrainingProgram userTrainingProgram = getOngoingUserTrainingProgram(user, trainingProgramId);

        // Mark the entire training program as completed
        userTrainingProgram.setStatus(UserTrainingProgramStatus.COMPLETED);
        userTrainingProgram.setCompletedAt(LocalDateTime.now());

        return mapper.mapToUserTrainingProgramResponse(userTrainingProgramRepository.save(userTrainingProgram));
    }

    @Transactional
    public UserTrainingProgramResponse leaveTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        UserTrainingProgram userTrainingProgram = getOngoingUserTrainingProgram(user, trainingProgramId);


        // Mark the training program as left
        userTrainingProgram.setStatus(UserTrainingProgramStatus.LEFT);
        userTrainingProgram.setCompletedAt(LocalDateTime.now());

        return mapper.mapToUserTrainingProgramResponse(userTrainingProgramRepository.save(userTrainingProgram));
    }

}
