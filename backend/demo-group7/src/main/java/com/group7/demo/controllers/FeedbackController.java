package com.group7.demo.controllers;

import com.group7.demo.dtos.FeedbackRequest;
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
    public ResponseEntity<Feedback> addFeedback(@RequestBody FeedbackRequest request) {
        Feedback feedback = feedbackService.addFeedback(request);
        return ResponseEntity.ok(feedback);
    }

    @GetMapping("/training-program/{id}")
    public ResponseEntity<List<Feedback>> getFeedbackForTrainingProgram(@PathVariable Long id) {
        List<Feedback> feedbackList = feedbackService.getFeedbackForTrainingProgram(id);
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Feedback>> getFeedbackForUser(@PathVariable Long id) {
        List<Feedback> feedbackList = feedbackService.getFeedbackForUser(id);
        return ResponseEntity.ok(feedbackList);
    }
}