package com.group7.demo.services;

import com.group7.demo.dtos.PostResponse;
import com.group7.demo.dtos.TrainingProgramResponse;
import com.group7.demo.dtos.mapper.Mapper;
import com.group7.demo.models.Exercise;
import com.group7.demo.models.Post;
import com.group7.demo.models.TrainingProgram;
import com.group7.demo.repository.ExerciseRepository;
import com.group7.demo.repository.PostRepository;
import com.group7.demo.repository.TrainingProgramRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private final ExerciseRepository exerciseRepository;
    private final PostRepository postRepository;
    private final TrainingProgramRepository trainingProgramRepository;

    private final Mapper mapper;

    public SearchService(ExerciseRepository exerciseRepository,
                         PostRepository postRepository,
                         TrainingProgramRepository trainingProgramRepository, Mapper mapper) {
        this.exerciseRepository = exerciseRepository;
        this.postRepository = postRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.mapper = mapper;
    }

//    public Map<String, Object> search(String query) {
//        Map<String, Object> results = new HashMap<>();
//
//        // Use the mapper for converting entities to response objects
//        List<PostResponse> postResponses = postRepository.search(query).stream()
//                .map(mapper::mapToPostResponse)
//                .collect(Collectors.toList());
//
//        // Map training programs (assumes you have a corresponding method in the Mapper class)
//        List<TrainingProgramResponse> trainingProgramResponses = trainingProgramRepository.search(query).stream()
//                .map(mapper::mapToTrainingProgramResponse)
//                .collect(Collectors.toList());
//
//        // Add exercises directly if they don't need custom mapping
//        List<Exercise> exercises = exerciseRepository.search(query);
//
//        // Add to the results map
//        results.put("posts", postResponses);
//        results.put("trainingPrograms", trainingProgramResponses);
//        results.put("exercises", exercises);
//
//        return results;
//    }

//    public Map<String, Object> search(List<String> keywords) {
//        // Search for posts, exercises, and training programs by looping over keywords
//        List<PostResponse> posts = keywords.stream()
//                .flatMap(keyword -> postRepository.search(keyword).stream())
//                .distinct() // Remove duplicates
//                .map(mapper::mapToPostResponse)
//                .toList();
//
//        List<Exercise> exercises = keywords.stream()
//                .flatMap(keyword -> exerciseRepository.search(keyword).stream())
//                .distinct()
//                .toList();
//
//        List<TrainingProgramResponse> trainingPrograms = keywords.stream()
//                .flatMap(keyword -> trainingProgramRepository.search(keyword).stream())
//                .distinct()
//                .map(mapper::mapToTrainingProgramResponse)
//                .toList();
//
//        // Aggregate results into a map
//        Map<String, Object> results = new HashMap<>();
//        results.put("posts", posts);
//        results.put("exercises", exercises);
//        results.put("trainingPrograms", trainingPrograms);
//
//        return results;
//    }
public Map<String, Object> search(String query, HttpServletRequest request) {
    // Split the query into individual keywords
    String[] keywords = query.trim().split("\\s+");

    // Initialize results with the first keyword
    Set<Post> posts = new HashSet<>(postRepository.search(keywords[0]));
    Set<Exercise> exercises = new HashSet<>(exerciseRepository.search(keywords[0]));
    Set<TrainingProgram> trainingPrograms = new HashSet<>(trainingProgramRepository.search(keywords[0]));

    // Intersect results for each subsequent keyword
    for (int i = 1; i < keywords.length; i++) {
        posts.retainAll(postRepository.search(keywords[i]));
        exercises.retainAll(exerciseRepository.search(keywords[i]));
        trainingPrograms.retainAll(trainingProgramRepository.search(keywords[i]));
    }

    // Map entities to DTOs
    List<PostResponse> postResponses = posts.stream()
            .map(post -> mapper.mapToPostResponse(post, request))
            .collect(Collectors.toList());

    List<Exercise> exerciseResponses = exercises.stream()
            .collect(Collectors.toList());

    List<TrainingProgramResponse> trainingProgramResponses = trainingPrograms.stream()
            .map(mapper::mapToTrainingProgramResponse)
            .collect(Collectors.toList());

    // Combine results into a single response
    Map<String, Object> response = Map.of(
            "posts", postResponses,
            "exercises", exerciseResponses,
            "trainingPrograms", trainingProgramResponses
    );

    return response;
}


}
