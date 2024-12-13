package com.group7.demo.controllers;

import com.group7.demo.dtos.FeedbackRequest;
import com.group7.demo.dtos.FeedbackResponse;
import com.group7.demo.models.Feedback;
import com.group7.demo.services.FeedbackService;
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
    public ResponseEntity<FeedbackResponse> addFeedback(@RequestBody FeedbackRequest request) {
        FeedbackResponse response = feedbackService.addFeedback(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/training-program/{id}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackForTrainingProgram(@PathVariable Long id) {
        List<FeedbackResponse> feedbackList = feedbackService.getFeedbackForTrainingProgram(id);
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackForUser(@PathVariable Long id) {
        List<FeedbackResponse> feedbackList = feedbackService.getFeedbackForUser(id);
        return ResponseEntity.ok(feedbackList);
    }
}