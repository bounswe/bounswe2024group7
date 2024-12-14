package com.group7.demo.controllers;

import com.group7.demo.dtos.TrainingProgramRequest;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.dtos.TrainingProgramWithTrackingResponse;
import com.group7.demo.services.TrainingProgramService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/training-programs")
@AllArgsConstructor
public class TrainingProgramController {

    private final TrainingProgramService trainingProgramService;

    // Endpoint to create a new training program
    @PostMapping
    public ResponseEntity<TrainingProgramResponse> createTrainingProgram(@RequestBody TrainingProgramRequest trainingProgramRequest, HttpServletRequest request) throws IllegalAccessException {
        TrainingProgramResponse createdProgram = trainingProgramService.createTrainingProgram(trainingProgramRequest, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
    }

    // Optional: Endpoint to fetch a list of training programs
    @GetMapping
    public ResponseEntity<List<TrainingProgramResponse>> getAllTrainingPrograms() {
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.getAllTrainingPrograms();
        return ResponseEntity.ok(trainingPrograms);
    }

    // Optional: Endpoint to fetch a specific training program by ID
    @GetMapping("/{id}")
    public ResponseEntity<TrainingProgramResponse> getTrainingProgramById(@PathVariable Long id) {
        TrainingProgramResponse trainingProgram = trainingProgramService.getTrainingProgramById(id);
        return ResponseEntity.ok(trainingProgram);
    }

    // Optional: Endpoint to delete a training program by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingProgram(@PathVariable Long id, HttpServletRequest request) throws Exception {
        trainingProgramService.deleteTrainingProgram(id, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{programId}/join")
    public ResponseEntity<TrainingProgramWithTrackingResponse> joinTrainingProgram(@PathVariable Long programId , HttpServletRequest request) {
        TrainingProgramWithTrackingResponse response = trainingProgramService.joinTrainingProgram(programId ,request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{programId}/leave")
    public ResponseEntity<TrainingProgramWithTrackingResponse> leaveProgram(@PathVariable Long programId, HttpServletRequest request) {
        TrainingProgramWithTrackingResponse response = trainingProgramService.leaveTrainingProgram(programId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{programId}/participants")
    public ResponseEntity<Set<String>> getRegisteredUsernames(@PathVariable Long programId) {
        Set<String> usernames = trainingProgramService.getRegisteredUsernames(programId);
        return ResponseEntity.ok(usernames);
    }

    @GetMapping("/trainer/{username}")
    public ResponseEntity<List<TrainingProgramResponse>> getTrainingProgramsByTrainer(@PathVariable String username) {
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.getTrainingProgramByTrainer(username);
        return ResponseEntity.ok(trainingPrograms);
    }

    @GetMapping("/joined/{username}")
    public ResponseEntity<List<TrainingProgramWithTrackingResponse>> getJoinedTrainingPrograms(@PathVariable String username) {
        List<TrainingProgramWithTrackingResponse> responses = trainingProgramService.getJoinedTrainingPrograms(username);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/{programId}/workout-exercises/{workoutExerciseId}/complete")
    public ResponseEntity<TrainingProgramWithTrackingResponse> completeExercise(
            @PathVariable Long programId,
            @PathVariable Long workoutExerciseId,
            @RequestBody List<Integer> completedSets,
            HttpServletRequest request)
    {
        TrainingProgramWithTrackingResponse response = trainingProgramService.completeExercise(programId, workoutExerciseId, request, completedSets);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{programId}/completion-rates")
    public ResponseEntity<Map<Long, Double>> getCompletionRates(@PathVariable Long programId) {
        Map<Long, Double> completionRates = trainingProgramService.getCompletionRatesForProgram(programId);
        return ResponseEntity.ok(completionRates);
    }



}
