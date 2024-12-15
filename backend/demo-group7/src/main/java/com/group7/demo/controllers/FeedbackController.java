package com.group7.demo.controllers;

import com.group7.demo.dtos.FeedbackRequest;
import com.group7.demo.dtos.FeedbackResponse;
import com.group7.demo.models.Feedback;
import com.group7.demo.services.FeedbackService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<FeedbackResponse> addFeedback(@RequestBody FeedbackRequest feedbackRequest, HttpServletRequest request) {
        FeedbackResponse response = feedbackService.addFeedback(feedbackRequest, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/training-program/{id}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackForTrainingProgram(@PathVariable Long id, HttpServletRequest request) {
        List<FeedbackResponse> feedbackList = feedbackService.getFeedbackForTrainingProgram(id, request);
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackForUser(@PathVariable String username, HttpServletRequest request) {
        List<FeedbackResponse> feedbackList = feedbackService.getFeedbackForUser(username, request);
        return ResponseEntity.ok(feedbackList);
    }
}