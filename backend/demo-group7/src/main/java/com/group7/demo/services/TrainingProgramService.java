package com.group7.demo.services;

import com.group7.demo.dtos.ExerciseDetail;
import com.group7.demo.dtos.TrainingProgramRequest;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.models.*;
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
        return mapToTrainingProgramResponse(savedProgram);
    }

    // Add a method to map TrainingProgram to TrainingProgramResponse
    private TrainingProgramResponse mapToTrainingProgramResponse(TrainingProgram program) {
        return TrainingProgramResponse.builder()
                .id(program.getId())
                .title(program.getTitle())
                .description(program.getDescription())
                .trainerUsername(program.getTrainer().getUsername())
                .createdAt(program.getCreatedAt())
                .exercises(program.getExercises().stream()
                        .map(this::mapToExerciseResponse)
                        .collect(Collectors.toList()))
                .participants(program.getParticipants() == null ?
                        List.of() :
                        program.getParticipants().stream()
                                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                                .collect(Collectors.toList()))
                .build();
    }


    private ExerciseDetail mapToExerciseResponse(TrainingProgramExercise trainingProgramExercise) {
        return ExerciseDetail.builder()
                .exercise(trainingProgramExercise.getExercise())
                .repetitions(trainingProgramExercise.getRepetitions())
                .sets(trainingProgramExercise.getSets())
                .build();
    }

    public List<TrainingProgramResponse> getAllTrainingPrograms() {
        // Fetch all training programs from the repository
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();

        // Map the list of TrainingProgram entities to TrainingProgramResponse DTOs
        return trainingPrograms.stream()
                .map(this::mapToTrainingProgramResponse)  // Use the mapping method to convert to response DTOs
                .collect(Collectors.toList());
    }

    public TrainingProgramResponse getTrainingProgramById(Long id) {
        // Find the training program by ID, or throw an exception if not found
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + id));

        // Map the TrainingProgram entity to TrainingProgramResponse DTO
        return mapToTrainingProgramResponse(trainingProgram);
    }

    @Transactional
    public List<TrainingProgramResponse> getTrainingProgramByTrainer(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findByTrainer(user);

        return trainingPrograms.stream()
                .map(this::mapToTrainingProgramResponse)
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
    public void joinTrainingProgram(Long trainingProgramId , HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training Program not found with id: " + trainingProgramId));

        boolean alreadyJoined = userTrainingProgramRepository.existsByUserAndTrainingProgram(user, trainingProgram);
        if (alreadyJoined) {
            throw new IllegalStateException("User has already joined the training program.");
        }

        // Create a new UserTrainingProgram entity
        UserTrainingProgram userTrainingProgram = UserTrainingProgram.builder()
                .user(user)
                .trainingProgram(trainingProgram)
                .joinedAt(LocalDateTime.now())
                .build();

        // Save the UserTrainingProgram entity
        userTrainingProgramRepository.save(userTrainingProgram);
    }

    @Transactional
    public void leaveTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        // Fetch the authenticated user from the request
        User user = authenticationService.getAuthenticatedUserInternal(request);

        // Fetch the training program by its ID
        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + trainingProgramId));

        // Check if the user is participating in the program
        UserTrainingProgram userTrainingProgram = userTrainingProgramRepository.findByUserIdAndTrainingProgramId(user.getId(), trainingProgram.getId())
                .orElseThrow(() -> new IllegalStateException("User is not participating in this program."));

        // Remove the user from the program
        userTrainingProgramRepository.delete(userTrainingProgram);
    }

    public List<String> getRegisteredUsernames(Long trainingProgramId) {
        // Fetch the training program by its ID
        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + trainingProgramId));

        // Fetch the list of participants' usernames
        return trainingProgram.getParticipants().stream()
                .map(userTrainingProgram -> userTrainingProgram.getUser().getUsername())
                .collect(Collectors.toList());
    }

    // Return the list of joined training programs for the authenticated user
    public List<TrainingProgramResponse> getJoinedTrainingPrograms(String username) throws Exception {
        // Fetch the authenticated user
        User user = userService.getUserByUsername(username);

        // Fetch the list of training programs the user has joined
        List<UserTrainingProgram> userTrainingPrograms = userTrainingProgramRepository.findByUser(user);

        // Map the list of UserTrainingProgram entities to TrainingProgramResponse DTOs
        return userTrainingPrograms.stream()
                .map(UserTrainingProgram::getTrainingProgram)
                .map(this::mapToTrainingProgramResponse)
                .collect(Collectors.toList());
    }


}
