package com.group7.demo.controllers;

import com.group7.demo.dtos.TrainingProgramRequest;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.services.TrainingProgramService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> joinTrainingProgram(@PathVariable Long programId , HttpServletRequest request) {
        trainingProgramService.joinTrainingProgram(programId ,request);
        return ResponseEntity.ok("User has successfully joined the training program.");
    }

    @DeleteMapping("/leave")
    public ResponseEntity<String> leaveProgram(@RequestParam Long programId, HttpServletRequest request) {
        trainingProgramService.leaveTrainingProgram(programId, request);
        return ResponseEntity.ok("Successfully left the training program.");
    }

    @GetMapping("/{programId}/participants")
    public ResponseEntity<List<String>> getRegisteredUsernames(@PathVariable Long programId) {
        List<String> usernames = trainingProgramService.getRegisteredUsernames(programId);
        return ResponseEntity.ok(usernames);
    }


    @GetMapping("/trainer/{username}")
    public ResponseEntity<List<TrainingProgramResponse>> getTrainingProgramsByTrainer(@PathVariable String username) {
        List<TrainingProgramResponse> trainingPrograms = trainingProgramService.getTrainingProgramByTrainer(username);
        return ResponseEntity.ok(trainingPrograms);
    }

}
