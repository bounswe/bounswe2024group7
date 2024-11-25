package com.group7.demo.controllers;

import com.group7.demo.dtos.TrainingProgramRequest;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.dtos.UserTrainingProgramResponse;
import com.group7.demo.services.TrainingProgramService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/training-programs")
@AllArgsConstructor
public class TrainingProgramController {

    private final TrainingProgramService trainingProgramService;

    // Endpoint to create a new training program
    @PostMapping
    public ResponseEntity<TrainingProgramResponse> createTrainingProgram(@RequestBody TrainingProgramRequest trainingProgramRequest, HttpServletRequest request) throws IllegalAccessException {
        try {
            TrainingProgramResponse createdProgram = trainingProgramService.createTrainingProgram(trainingProgramRequest, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

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
        try {
            trainingProgramService.deleteTrainingProgram(id, request);
            return ResponseEntity.noContent().build();
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }


    @PostMapping("/{programId}/join")
    public ResponseEntity<UserTrainingProgramResponse> joinTrainingProgram(@PathVariable Long programId , HttpServletRequest request) {
        try {
            UserTrainingProgramResponse response = trainingProgramService.joinTrainingProgram(programId ,request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException | EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{programId}/leave")
    public ResponseEntity<UserTrainingProgramResponse> leaveProgram(@PathVariable Long programId, HttpServletRequest request) {
        try {
            UserTrainingProgramResponse response = trainingProgramService.leaveTrainingProgram(programId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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

    @PostMapping("/{trainingProgramId}/exercises/{exerciseId}/complete")
    public ResponseEntity<UserTrainingProgramResponse> markExerciseAsCompleted(
            @PathVariable Long trainingProgramId,
            @PathVariable Long exerciseId,
            HttpServletRequest request
    ) {
        try{
            UserTrainingProgramResponse response = trainingProgramService.markExerciseAsCompleted(trainingProgramId, exerciseId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/{trainingProgramId}/exercises/{exerciseId}/uncomplete")
    public ResponseEntity<UserTrainingProgramResponse> unmarkExerciseAsCompleted(
            @PathVariable Long trainingProgramId,
            @PathVariable Long exerciseId,
            HttpServletRequest request) {
        try{
            UserTrainingProgramResponse response = trainingProgramService.unmarkExerciseAsCompleted(trainingProgramId, exerciseId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/{trainingProgramId}/complete")
    public ResponseEntity<UserTrainingProgramResponse> markTrainingProgramAsCompleted(
            @PathVariable Long trainingProgramId,
            HttpServletRequest request
    ) {
        try {
            UserTrainingProgramResponse response = trainingProgramService.markTrainingProgramAsCompleted(trainingProgramId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/joined/{username}")
    public ResponseEntity<List<UserTrainingProgramResponse>> getJoinedTrainingPrograms(@PathVariable String username) {
        try {
            List<UserTrainingProgramResponse> responses = trainingProgramService.getJoinedTrainingPrograms(username);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}
