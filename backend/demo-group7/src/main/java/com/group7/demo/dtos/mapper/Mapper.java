package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.models.*;
import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class Mapper {
    private final AuthenticationService authenticationService;
    public PostResponse mapToPostResponse(Post post, HttpServletRequest request) {
        User currentUser = authenticationService.getAuthenticatedUserInternal(request);

        return PostResponse.builder()
                .id(post.getId())
                .content(post.getContent())
                .tags(post.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .createdAt(post.getCreatedAt())
                .username(post.getUser().getUsername())
                .trainingProgram(post.getTrainingProgram() == null ? null : mapToTrainingProgramResponse(post.getTrainingProgram()))
                .likeCount(post.getLikedByUsers() == null ? 0 : post.getLikedByUsers().size())
                .isLiked(currentUser != null && post.getLikedByUsers() != null && post.getLikedByUsers().contains(currentUser))
                .isBookmarked(currentUser != null && post.getBookmarkedByUsers() != null && post.getBookmarkedByUsers().contains(currentUser))
                .imageUrl(post.getImageUrl())
                .build();
    }

    public TrainingProgramResponse mapToTrainingProgramResponse(TrainingProgram program) {
        return TrainingProgramResponse.builder()
                .id(program.getId())
                .title(program.getTitle())
                .description(program.getDescription())
                .trainer(program.getTrainer().getUsername())
                .type(program.getType())
                .level(program.getLevel())
                .interval(program.getInterval())
                .rating(program.getRating())
                .ratingCount(program.getRatingCount())
                .createdAt(program.getCreatedAt())
                .weeks(program.getWeeks().stream()
                        .map(this::mapToWeekResponse)
                        .sorted(Comparator.comparing(WeekResponse::getWeekNumber))
                        .collect(Collectors.toList()))
                .participants(program.getParticipants() == null ?
                        Set.of() :
                        program.getParticipants().stream()
                                .filter(participant -> participant.getStatus() == TrainingProgramWithTrackingStatus.ONGOING)
                                .map(trainingProgramWithTracking -> trainingProgramWithTracking.getUser().getUsername())
                                .collect(Collectors.toSet()))
                .build();
    }

    private WeekResponse mapToWeekResponse(Week week) {
        return WeekResponse.builder()
                .id(week.getId())
                .weekNumber(week.getWeekNumber())
                .workouts(week.getWorkouts().stream()
                        .map(this::mapToWorkoutResponse)
                        .sorted(Comparator.comparing(WorkoutResponse::getWorkoutNumber))
                        .collect(Collectors.toList()))
                .build();
    }

    private WorkoutResponse mapToWorkoutResponse(Workout workout) {
        return WorkoutResponse.builder()
                .id(workout.getId())
                .name(workout.getName())
                .workoutNumber(workout.getWorkoutNumber())
                .workoutExercises(workout.getWorkoutExercises().stream()
                        .map(this::maptoWorkoutExerciseResponse)
                        .sorted(Comparator.comparing(WorkoutExerciseResponse::getExerciseNumber))
                        .collect(Collectors.toList()))
                .build();
    }

    private WorkoutExerciseResponse maptoWorkoutExerciseResponse(WorkoutExercise workoutExercise) {
        return WorkoutExerciseResponse.builder()
                .id(workoutExercise.getId())
                .exerciseNumber(workoutExercise.getExerciseNumber())
                .exercise(workoutExercise.getExercise())
                .repetitions(workoutExercise.getRepetitions())
                .sets(workoutExercise.getSets())
                .build();
    }

    public TrainingProgramWithTrackingResponse mapToTrainingProgramWithTrackingResponse(TrainingProgramWithTracking trainingProgramWithTracking) {
        TrainingProgram program = trainingProgramWithTracking.getTrainingProgram();
        return TrainingProgramWithTrackingResponse.builder()
                .id(program.getId())
                .title(program.getTitle())
                .description(program.getDescription())
                .trainer(program.getTrainer().getUsername())
                .type(program.getType())
                .level(program.getLevel())
                .interval(program.getInterval())
                .rating(program.getRating())
                .ratingCount(program.getRatingCount())
                .createdAt(program.getCreatedAt())
                .joinedAt(trainingProgramWithTracking.getJoinedAt())
                .status(trainingProgramWithTracking.getStatus())
                .completedAt(trainingProgramWithTracking.getCompletedAt())
                .weeks(trainingProgramWithTracking.getWeeksWithTracking().stream()
                        .map(this::mapToWeekWithTrackingResponse)
                        .sorted(Comparator.comparing(WeekWithTrackingResponse::getWeekNumber))
                        .collect(Collectors.toList()))
                .participants(program.getParticipants() == null ?
                        Set.of() :
                        program.getParticipants().stream()
                                .filter(participant -> participant.getStatus() == TrainingProgramWithTrackingStatus.ONGOING)
                                .map(t -> trainingProgramWithTracking.getUser().getUsername())
                                .collect(Collectors.toSet()))
                .build();
    }

    private WeekWithTrackingResponse mapToWeekWithTrackingResponse(WeekWithTracking weekWithTracking) {
        return WeekWithTrackingResponse.builder()
                .id(weekWithTracking.getWeek().getId())
                .weekNumber(weekWithTracking.getWeek().getWeekNumber())
                .completedAt(weekWithTracking.getCompletedAt())
                .workouts(weekWithTracking.getWorkoutsWithTracking().stream()
                        .map(this::mapToWorkoutWithTrackingResponse)
                        .sorted(Comparator.comparing(WorkoutWithTrackingResponse::getWorkoutNumber))
                        .collect(Collectors.toList()))
                .build();
    }

    private WorkoutWithTrackingResponse mapToWorkoutWithTrackingResponse(WorkoutWithTracking workoutWithTracking) {
        return WorkoutWithTrackingResponse.builder()
                .id(workoutWithTracking.getWorkout().getId())
                .name(workoutWithTracking.getWorkout().getName())
                .workoutNumber(workoutWithTracking.getWorkout().getWorkoutNumber())
                .completedAt(workoutWithTracking.getCompletedAt())
                .workoutExercises(workoutWithTracking.getWorkoutExercisesWithTracking().stream()
                        .map(this::mapToWorkoutExerciseWithTracking)
                        .sorted(Comparator.comparing(WorkoutExerciseWithTrackingResponse::getExerciseNumber))
                        .collect(Collectors.toList()))
                .build();
    }

    private WorkoutExerciseWithTrackingResponse mapToWorkoutExerciseWithTracking(WorkoutExerciseWithTracking workoutExerciseWithTracking) {
        return WorkoutExerciseWithTrackingResponse.builder()
                .id(workoutExerciseWithTracking.getWorkoutExercise().getId())
                .exerciseNumber(workoutExerciseWithTracking.getWorkoutExercise().getExerciseNumber())
                .exercise(workoutExerciseWithTracking.getWorkoutExercise().getExercise())
                .repetitions(workoutExerciseWithTracking.getWorkoutExercise().getRepetitions())
                .sets(workoutExerciseWithTracking.getWorkoutExercise().getSets())
                .completedAt(workoutExerciseWithTracking.getCompletedAt())
                .completedSets(workoutExerciseWithTracking.getCompletedSets())
                .build();
    }


    public FeedbackResponse mapToFeedbackResponse(Feedback feedback) {
        return FeedbackResponse.builder()
                .id(feedback.getId())
                .trainingProgramTitle(feedback.getTrainingProgram().getTitle()) // Map training program title
                .username(feedback.getUser().getUsername()) // Map user's username
                .bodyPart(feedback.getBodyPart()) // Map body part
                .weekNumber(feedback.getWeekNumber()) // Map week number
                .workoutNumber(feedback.getWorkoutNumber()) // Map workout number
                .exerciseNumber(feedback.getExerciseNumber()) // Map exercise number
                .feedbackText(feedback.getFeedbackText()) // Map feedback text
                .createdAt(feedback.getCreatedAt()) // Map creation timestamp
                .build();
    }



}
