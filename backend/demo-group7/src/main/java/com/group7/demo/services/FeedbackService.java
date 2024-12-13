package com.group7.demo.services;

import com.group7.demo.dtos.FeedbackRequest;
import com.group7.demo.models.Feedback;
import com.group7.demo.models.TrainingProgram;
import com.group7.demo.models.User;
import com.group7.demo.repository.FeedbackRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import com.group7.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final UserRepository userRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, TrainingProgramRepository trainingProgramRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.userRepository = userRepository;
    }

    public Feedback addFeedback(FeedbackRequest request) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(request.getTrainingProgramId())
                .orElseThrow(() -> new IllegalArgumentException("Training Program not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Feedback feedback = Feedback.builder()
                .trainingProgram(trainingProgram)
                .user(user)
                .bodyPart(request.getBodyPart())
                .weekNumber(request.getWeekNumber())
                .workoutNumber(request.getWorkoutNumber())
                .exerciseNumber(request.getExerciseNumber())
                .feedbackText(request.getFeedbackText())
                .build();

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackForTrainingProgram(Long trainingProgramId) {
        return feedbackRepository.findByTrainingProgramId(trainingProgramId);
    }

    public List<Feedback> getFeedbackForUser(Long userId) {
        return feedbackRepository.findByUserId(userId);
    }
}