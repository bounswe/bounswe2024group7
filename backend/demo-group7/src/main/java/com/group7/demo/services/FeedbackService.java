package com.group7.demo.services;

import com.group7.demo.dtos.FeedbackRequest;
import com.group7.demo.dtos.FeedbackResponse;
import com.group7.demo.dtos.mapper.Mapper;
import com.group7.demo.models.Feedback;
import com.group7.demo.models.TrainingProgram;
import com.group7.demo.models.User;
import com.group7.demo.repository.FeedbackRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import com.group7.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final UserRepository userRepository;
    private final Mapper mapper;

    public FeedbackService(FeedbackRepository feedbackRepository, TrainingProgramRepository trainingProgramRepository, UserRepository userRepository, Mapper mapper) {
        this.feedbackRepository = feedbackRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public FeedbackResponse addFeedback(FeedbackRequest request) {
        // Validate and fetch related entities
        TrainingProgram trainingProgram = trainingProgramRepository.findById(request.getTrainingProgramId())
                .orElseThrow(() -> new IllegalArgumentException("Training Program not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create the Feedback entity
        Feedback feedback = Feedback.builder()
                .trainingProgram(trainingProgram)
                .user(user)
                .bodyPart(request.getBodyPart())
                .weekNumber(request.getWeekNumber())
                .workoutNumber(request.getWorkoutNumber())
                .exerciseNumber(request.getExerciseNumber())
                .feedbackText(request.getFeedbackText())
                .build();

        // Save the Feedback and map to FeedbackResponse
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return mapper.mapToFeedbackResponse(savedFeedback);
    }

    public List<FeedbackResponse> getFeedbackForTrainingProgram(Long trainingProgramId) {
        List<Feedback> feedbackList = feedbackRepository.findByTrainingProgramId(trainingProgramId);
        return feedbackList.stream()
                .map(mapper::mapToFeedbackResponse)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbackForUser(Long userId) {
        List<Feedback> feedbackList = feedbackRepository.findByUserId(userId);

        // Map each Feedback entity to a FeedbackResponse DTO
        return feedbackList.stream()
                .map(mapper::mapToFeedbackResponse) // Use the Mapper to convert each Feedback to FeedbackResponse
                .collect(Collectors.toList());

    }
}