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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public SurveyService(SurveyRepository surveyRepository, TagRepository tagRepository, UserRepository userRepository, AuthenticationService authenticationService) {
        this.surveyRepository = surveyRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
    }

    // Add a new survey
    @Transactional
    public SurveyResponse addSurvey(SurveyRequest request, HttpServletRequest httpServletRequest) {
        // Validate the user
        User user = authenticationService.getAuthenticatedUserInternal(httpServletRequest);

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


    // Get survey of authenticated user
    public SurveyResponse getSurveyForAuthenticatedUser(HttpServletRequest request) {
        // Fetch the authenticated user
        User user = authenticationService.getAuthenticatedUserInternal(request);

        Long userId = getUserIdFromUsername(user.getUsername());

        // Find the survey for the authenticated user
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for the authenticated user."));

        // Map the survey to SurveyResponse DTO
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

    public List<String> getUserFitnessGoals(HttpServletRequest request) {
        // Fetch the authenticated user
        User user = authenticationService.getAuthenticatedUserInternal(request);
        Long userId = getUserIdFromUsername(user.getUsername());
        // Find the survey for the authenticated user
        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for the authenticated user."));

        // Extract and return the fitness goals as a list of strings
        return survey.getFitnessGoals().stream()
                .map(Tag::getName) // Assuming fitness goals are stored as a collection of Tag entities
                .collect(Collectors.toList());
    }



    @Transactional
    public List<String> addFitnessGoals(List<String> goals, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);
        Long userId = getUserIdFromUsername(user.getUsername());

        Survey survey = surveyRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found for user name: " + user.getUsername()));

        Set<Tag> tagsToAdd = goals.stream()
                .map(goal -> tagRepository.findByName(goal.toLowerCase())
                        .orElseGet(() -> {
                            // Create and save a new Tag if not found
                            Tag newTag = new Tag();
                            newTag.setName(goal.toLowerCase());
                            return tagRepository.save(newTag);
                        }))
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

    @Transactional
    public void removeFitnessGoals(List<String> goals, HttpServletRequest request) {
        User user = authenticationService.getAuthenticatedUserInternal(request);

        Long userId = getUserIdFromUsername(user.getUsername());
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
