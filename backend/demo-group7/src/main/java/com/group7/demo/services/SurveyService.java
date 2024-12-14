package com.group7.demo.services;

import com.group7.demo.dtos.SurveyRequest;
import com.group7.demo.dtos.SurveyResponse;
import com.group7.demo.models.enums.ProgramLevel;
import com.group7.demo.models.Survey;
import com.group7.demo.models.Tag;
import com.group7.demo.models.User;
import com.group7.demo.repository.SurveyRepository;
import com.group7.demo.repository.TagRepository;
import com.group7.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    public SurveyService(SurveyRepository surveyRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.surveyRepository = surveyRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    // Add a new survey
    public SurveyResponse addSurvey(SurveyRequest request) {
        // Validate the user
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Map tag names to Tag entities (convert input to lowercase)
        Set<Tag> tags = request.getFitnessGoals().stream()
                .map(tagName -> tagRepository.findByName(tagName.toLowerCase()) // Normalize to lowercase
                        .orElseThrow(() -> new IllegalArgumentException("Tag not found: " + tagName)))
                .collect(Collectors.toSet());

        // Build and save the survey
        Survey survey = Survey.builder()
                .user(user)
                .fitnessGoals(tags)
                .fitnessLevel(ProgramLevel.valueOf(request.getFitnessLevel().toUpperCase())) // Convert to enum
                .build();

        Survey savedSurvey = surveyRepository.save(survey);

        // Return the response
        return mapToResponse(savedSurvey);
    }


    // Get survey by user username
    public SurveyResponse getSurveyByUser(String username) {
        Long userId = getUserIdFromUsername(username);
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for user ID: " + userId));

        return mapToResponse(survey);
    }

    // Helper method to map Survey to SurveyResponse
    private SurveyResponse mapToResponse(Survey survey) {
        return SurveyResponse.builder()
                .id(survey.getId())
                .username(survey.getUser().getUsername())
                .fitnessGoals(survey.getFitnessGoals().stream()
                        .map(Tag::getName)
                        .collect(Collectors.toList()))
                .fitnessLevel(survey.getFitnessLevel().name())
                .build();
    }

    public List<String> getUserFitnessGoals(String username) {
        Long userId = getUserIdFromUsername(username);
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for user ID: " + userId));

        return survey.getFitnessGoals().stream()
                .map(Tag::getName)
                .collect(Collectors.toList());
    }


    public List<String> addFitnessGoals(String username, List<String> goals) {
        Long userId = getUserIdFromUsername(username);
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for user ID: " + userId));

        // Find and collect Tag entities for the provided goal names
        Set<Tag> tagsToAdd = goals.stream()
                .map(goal -> tagRepository.findByName(goal.toLowerCase())
                        .orElseThrow(() -> new IllegalArgumentException("Tag not found: " + goal)))
                .collect(Collectors.toSet());

        // Add the new tags to the survey
        Set<Tag> existingGoals = survey.getFitnessGoals();
        tagsToAdd.removeAll(existingGoals); // Avoid adding duplicate goals
        existingGoals.addAll(tagsToAdd);

        // Save the updated survey
        surveyRepository.save(survey);

        // Return the names of the newly added goals
        return tagsToAdd.stream()
                .map(Tag::getName)
                .collect(Collectors.toList());
    }

    public void removeFitnessGoals(String username, List<String> goals) {
        Long userId = getUserIdFromUsername(username);
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for user ID: " + userId));

        Set<Tag> tagsToRemove = goals.stream()
                .map(goal -> tagRepository.findByName(goal.toLowerCase())
                        .orElseThrow(() -> new IllegalArgumentException("Tag not found: " + goal)))
                .collect(Collectors.toSet());

        if (!survey.getFitnessGoals().containsAll(tagsToRemove)) {
            throw new IllegalArgumentException("Some goals are not associated with the user");
        }

        survey.getFitnessGoals().removeAll(tagsToRemove);
        surveyRepository.save(survey);
    }

    private Long getUserIdFromUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username))
                .getId();
    }


}
