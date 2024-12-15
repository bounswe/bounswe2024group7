package com.group7.demo.controllers;

import com.group7.demo.dtos.SurveyRequest;
import com.group7.demo.dtos.SurveyResponse;
import com.group7.demo.services.SurveyService;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<SurveyResponse> addSurvey(@RequestBody SurveyRequest request, HttpServletRequest httpServletRequest) {
        SurveyResponse response = surveyService.addSurvey(request, httpServletRequest);
        return ResponseEntity.ok(response);
    }

    // Get survey by username
    @GetMapping("/user/{username}")
    public ResponseEntity<SurveyResponse> getSurveyByUser(@PathVariable String username) {
        SurveyResponse response = surveyService.getSurveyByUser(username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{username}/fitness-goals")
    public ResponseEntity<List<String>> getUserFitnessGoals(@PathVariable String username) {
        List<String> fitnessGoals = surveyService.getUserFitnessGoals(username);
        return ResponseEntity.ok(fitnessGoals);
    }

    // Add multiple fitness goals
    @PostMapping("/{username}/fitness-goals")
    public ResponseEntity<List<String>> addFitnessGoals(@PathVariable String username, @RequestBody List<String> goals) {
        List<String> addedGoals = surveyService.addFitnessGoals(username, goals);
        return ResponseEntity.ok(addedGoals);
    }

    // Remove multiple fitness goals
    @DeleteMapping("/{username}/fitness-goals")
    public ResponseEntity<Void> removeFitnessGoals(@PathVariable String username, @RequestBody List<String> goals) {
        surveyService.removeFitnessGoals(username, goals);
        return ResponseEntity.ok().build();
    }
}
