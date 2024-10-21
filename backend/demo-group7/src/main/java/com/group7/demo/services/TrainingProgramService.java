package com.group7.demo.services;

import com.group7.demo.dtos.ExerciseDetailResponse;
import com.group7.demo.dtos.ExerciseResponse;
import com.group7.demo.dtos.TrainingProgramRequest;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.models.Exercise;
import com.group7.demo.models.ExerciseDetail;
import com.group7.demo.models.TrainingProgram;
import com.group7.demo.models.User;
import com.group7.demo.repository.ExerciseRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import com.group7.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;

    private final UserRepository userRepository;

    private final ExerciseRepository exerciseRepository;
    @Transactional
    public TrainingProgramResponse createTrainingProgram(TrainingProgramRequest request) {
        // Find the trainer by ID (you should have a Trainer/User repository)
        User trainer = userRepository.findById(request.getTrainerId())
                .orElseThrow(() -> new EntityNotFoundException("Trainer not found"));

        // Create the training program
        TrainingProgram trainingProgram = TrainingProgram.builder()
                .title(request.getTitle())
                .programType(request.getProgramType())
                .locationType(request.getLocationType())
                .description(request.getDescription())
                .trainer(trainer)
                .build();

        // Map exercises from request to entity
        List<Exercise> exercises = request.getExercises().stream()
                .map(exerciseRequest -> {
                    // Create exercise
                    Exercise exercise = Exercise.builder()
                            .name(exerciseRequest.getName())
                            .muscleGroup(exerciseRequest.getMuscleGroup())
                            .build();

                    // Create exercise detail (assuming `ExerciseRequest` has `getSets()` and `getRepetitions()` methods)
                    ExerciseDetail exerciseDetail = ExerciseDetail.builder()
                            .sets(exerciseRequest.getSets())  // Make sure this retrieves the sets from the request
                            .repetitions(exerciseRequest.getRepetitions())  // Retrieves repetitions from the request
                            .exercise(exercise)
                            .build();

                    // Link the exercise with its exercise detail
                    exercise.setExerciseDetail(exerciseDetail);

                    return exercise;
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
                .programType(program.getProgramType())
                .locationType(program.getLocationType())
                .exercises(program.getExercises().stream()
                        .map(this::mapToExerciseResponse)
                        .collect(Collectors.toList()))
                .description(program.getDescription())
                .trainerUsername(program.getTrainer().getUsername())
                .build();
    }

    private ExerciseResponse mapToExerciseResponse(Exercise exercise) {
        return ExerciseResponse.builder()
                .name(exercise.getName())
                .muscleGroup(exercise.getMuscleGroup())
                .exerciseDetail(ExerciseDetailResponse.builder()
                        .sets(exercise.getExerciseDetail().getSets())
                        .repetitions(exercise.getExerciseDetail().getRepetitions())
                        .build())
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
    public void deleteTrainingProgram(Long id) {
        // Find the training program by ID, or throw an exception if not found
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Training program not found with id: " + id));

        // Delete the training program
        trainingProgramRepository.delete(trainingProgram);
    }


}
