package com.group7.demo.controllers;

import com.group7.demo.dtos.ExerciseProgressResponse;
import com.group7.demo.models.Exercise;
import com.group7.demo.services.ExerciseService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping()
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public Exercise getExercise(@PathVariable Long id) {
        return exerciseService.getExercise(id);
    }

    @GetMapping("/{id}/progress")
    public ExerciseProgressResponse getUserExerciseProgress(@PathVariable Long id, HttpServletRequest request) {
        return exerciseService.getUserExerciseProgress(id, request);
    }
}
