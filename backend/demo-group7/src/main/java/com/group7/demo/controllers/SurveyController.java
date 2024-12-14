package com.group7.demo.controllers;

import com.group7.demo.dtos.SurveyRequest;
import com.group7.demo.dtos.SurveyResponse;
import com.group7.demo.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    // Add a new survey
    @PostMapping
    public ResponseEntity<SurveyResponse> addSurvey(@RequestBody SurveyRequest request) {
        SurveyResponse response = surveyService.addSurvey(request);
        return ResponseEntity.ok(response);
    }

    // Get survey by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<SurveyResponse> getSurveyByUser(@PathVariable Long userId) {
        SurveyResponse response = surveyService.getSurveyByUser(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/fitness-goals")
    public ResponseEntity<List<String>> getUserFitnessGoals(@PathVariable Long userId) {
        List<String> fitnessGoals = surveyService.getUserFitnessGoals(userId);
        return ResponseEntity.ok(fitnessGoals);
    }

    // Add multiple fitness goals
    @PostMapping("/{userId}/fitness-goals")
    public ResponseEntity<List<String>> addFitnessGoals(@PathVariable Long userId, @RequestBody List<String> goals) {
        List<String> addedGoals = surveyService.addFitnessGoals(userId, goals);
        return ResponseEntity.ok(addedGoals);
    }

    // Remove multiple fitness goals
    @DeleteMapping("/{userId}/fitness-goals")
    public ResponseEntity<Void> removeFitnessGoals(@PathVariable Long userId, @RequestBody List<String> goals) {
        surveyService.removeFitnessGoals(userId, goals);
        return ResponseEntity.ok().build();
    }
}
