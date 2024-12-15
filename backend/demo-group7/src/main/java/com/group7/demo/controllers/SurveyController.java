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
    @GetMapping("/user")
    public ResponseEntity<SurveyResponse> getSurveyByUser(HttpServletRequest request) {
        SurveyResponse response = surveyService.getSurveyForAuthenticatedUser(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/fitness-goals")
    public ResponseEntity<List<String>> getUserFitnessGoals(HttpServletRequest request) {
        List<String> fitnessGoals = surveyService.getUserFitnessGoals(request);
        return ResponseEntity.ok(fitnessGoals);
    }

    // Add multiple fitness goals
    @PostMapping("/fitness-goals")
    public ResponseEntity<List<String>> addFitnessGoals(@RequestBody List<String> goals, HttpServletRequest request) {
        List<String> addedGoals = surveyService.addFitnessGoals(goals, request);
        return ResponseEntity.ok(addedGoals);
    }


    // Remove multiple fitness goals
    @DeleteMapping("/fitness-goals")
    public ResponseEntity<Void> removeFitnessGoals(@RequestBody List<String> goals, HttpServletRequest request) {
        surveyService.removeFitnessGoals(goals, request);
        return ResponseEntity.ok().build();
    }
}
