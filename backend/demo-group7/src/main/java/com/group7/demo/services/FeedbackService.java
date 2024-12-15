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
import jakarta.servlet.http.HttpServletRequest;
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
    private final AuthenticationService authenticationService;

    public FeedbackService(FeedbackRepository feedbackRepository, TrainingProgramRepository trainingProgramRepository, UserRepository userRepository, Mapper mapper, AuthenticationService authenticationService) {
        this.feedbackRepository = feedbackRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.authenticationService = authenticationService;
    }


    public FeedbackResponse addFeedback(FeedbackRequest feedbackRequest, HttpServletRequest request) {
        // Validate and fetch related entities
        TrainingProgram trainingProgram = trainingProgramRepository.findById(feedbackRequest.getTrainingProgramId())
                .orElseThrow(() -> new IllegalArgumentException("Training Program not found"));

        User user = authenticationService.getAuthenticatedUserInternal(request);

        boolean isParticipant = trainingProgram.getParticipants().stream()
                .anyMatch(participant -> participant.getUser().equals(user));

        if (!isParticipant) {
            throw new IllegalArgumentException("User is not a participant of the Training Program");
        }

        // Create the Feedback entity
        Feedback feedback = Feedback.builder()
                .trainingProgram(trainingProgram)
                .user(user)
                .bodyPart(feedbackRequest.getBodyPart())
                .weekNumber(feedbackRequest.getWeekNumber())
                .workoutNumber(feedbackRequest.getWorkoutNumber())
                .exerciseNumber(feedbackRequest.getExerciseNumber())
                .feedbackText(feedbackRequest.getFeedbackText())
                .build();

        // Save the Feedback and map to FeedbackResponse
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return mapper.mapToFeedbackResponse(savedFeedback);
    }

    public List<FeedbackResponse> getFeedbackForTrainingProgram(Long trainingProgramId, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId)
                .orElseThrow(() -> new IllegalArgumentException("Training Program not found"));

        if (!trainingProgram.getTrainer().equals(user)) {
            throw new IllegalArgumentException("User is not authorized to view feedback for this Training Program");
        }


        List<Feedback> feedbackList = feedbackRepository.findByTrainingProgramId(trainingProgramId);
        return feedbackList.stream()
                .map(mapper::mapToFeedbackResponse)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbackForUser(String username, HttpServletRequest request) {
        // Fetch the authenticated user (trainer)
        User trainer = authenticationService.getAuthenticatedUserInternal(request);

        // Find the user by username
        User targetUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Fetch feedback for the specified user
        List<Feedback> feedbackList = feedbackRepository.findByUserId(targetUser.getId());

        // Filter feedback to include only those for training programs created by the trainer
        List<Feedback> filteredFeedback = feedbackList.stream()
                .filter(feedback -> feedback.getTrainingProgram().getTrainer().equals(trainer))
                .toList();

        // Map the filtered feedback to FeedbackResponse DTOs
        return filteredFeedback.stream()
                .map(mapper::mapToFeedbackResponse)
                .collect(Collectors.toList());
    }
}