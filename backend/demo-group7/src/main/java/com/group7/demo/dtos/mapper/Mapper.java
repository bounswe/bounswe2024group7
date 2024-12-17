package com.group7.demo.dtos.mapper;

import com.group7.demo.dtos.*;
import com.group7.demo.dtos.jsonld.PostJsonLd;
import com.group7.demo.models.*;
import com.group7.demo.models.enums.TrainingProgramWithTrackingStatus;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Map;
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

        long totalExercises = trainingProgramWithTracking.getWeeksWithTracking().stream()
                .flatMap(week -> week.getWorkoutsWithTracking().stream())
                .flatMap(workout -> workout.getWorkoutExercisesWithTracking().stream())
                .count();

        long completedExercises = trainingProgramWithTracking.getWeeksWithTracking().stream()
                .flatMap(week -> week.getWorkoutsWithTracking().stream())
                .flatMap(workout -> workout.getWorkoutExercisesWithTracking().stream())
                .filter(exercise -> exercise.getCompletedAt() != null)
                .count();

        double completionPercentage = (totalExercises == 0) ? 0 : (double) completedExercises / totalExercises * 100;

        return TrainingProgramWithTrackingResponse.builder()
                .id(program.getId())
                .trackingId(trainingProgramWithTracking.getId())
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
                .lastCompletedWorkoutDate(getLastCompletedWorkoutDate(trainingProgramWithTracking))
                .completionPercentage(completionPercentage)
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
        long totalExercises = weekWithTracking.getWorkoutsWithTracking().stream()
                .flatMap(workout -> workout.getWorkoutExercisesWithTracking().stream())
                .count();

        long completedExercises = weekWithTracking.getWorkoutsWithTracking().stream()
                .flatMap(workout -> workout.getWorkoutExercisesWithTracking().stream())
                .filter(exercise -> exercise.getCompletedAt() != null)
                .count();

        double completionPercentage = (totalExercises == 0) ? 0 : (double) completedExercises / totalExercises * 100;

        return WeekWithTrackingResponse.builder()
                .id(weekWithTracking.getWeek().getId())
                .weekNumber(weekWithTracking.getWeek().getWeekNumber())
                .completedAt(weekWithTracking.getCompletedAt())
                .completionPercentage(completionPercentage)
                .workouts(weekWithTracking.getWorkoutsWithTracking().stream()
                        .map(this::mapToWorkoutWithTrackingResponse)
                        .sorted(Comparator.comparing(WorkoutWithTrackingResponse::getWorkoutNumber))
                        .collect(Collectors.toList()))
                .build();
    }


    private WorkoutWithTrackingResponse mapToWorkoutWithTrackingResponse(WorkoutWithTracking workoutWithTracking) {
        long totalExercises = workoutWithTracking.getWorkoutExercisesWithTracking().size();
        long completedExercises = workoutWithTracking.getWorkoutExercisesWithTracking().stream()
                .filter(exercise -> exercise.getCompletedAt() != null)
                .count();

        double completionPercentage = (totalExercises == 0) ? 0 : (double) completedExercises / totalExercises * 100;

        return WorkoutWithTrackingResponse.builder()
                .id(workoutWithTracking.getWorkout().getId())
                .name(workoutWithTracking.getWorkout().getName())
                .workoutNumber(workoutWithTracking.getWorkout().getWorkoutNumber())
                .completedAt(workoutWithTracking.getCompletedAt())
                .completionPercentage(completionPercentage)
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

    private LocalDate getLastCompletedWorkoutDate(TrainingProgramWithTracking trainingProgramWithTracking) {
        return trainingProgramWithTracking.getWeeksWithTracking().stream()
                .flatMap(weekWithTracking -> weekWithTracking.getWorkoutsWithTracking().stream())
                .filter(workoutWithTracking -> workoutWithTracking.getCompletedAt() != null)
                .map(workoutWithTracking -> workoutWithTracking.getCompletedAt().toLocalDate())
                .max(LocalDate::compareTo)
                .orElse(null);
    }


    public FeedbackResponse mapToFeedbackResponse(Feedback feedback) {
        return FeedbackResponse.builder()
                .id(feedback.getId())
                .trainingProgramTitle(feedback.getTrainingProgram().getTitle()) // Map training program title
                .username(feedback.getUser().getUsername()) // Map user's username
                .feedbackMuscle(feedback.getFeedbackMuscle()) // Map body part
                .weekNumber(feedback.getWeekNumber()) // Map week number
                .workoutNumber(feedback.getWorkoutNumber()) // Map workout number
                .exerciseNumber(feedback.getExerciseNumber()) // Map exercise number
                .feedbackText(feedback.getFeedbackText()) // Map feedback text
                .createdAt(feedback.getCreatedAt()) // Map creation timestamp
                .build();
    }

    public PostJsonLd mapToPostJsonLd(Post post) {
        // Create array of interaction statistics for both likes and bookmarks
        Map<String, Object>[] interactionStats = new Map[2];
        
        // Like statistics
        interactionStats[0] = Map.of(
            "@type", "InteractionCounter",
            "interactionType", "https://schema.org/LikeAction",
            "userInteractionCount", post.getLikedByUsers() != null ? post.getLikedByUsers().size() : 0
        );
        
        // Bookmark statistics
        interactionStats[1] = Map.of(
            "@type", "InteractionCounter",
            "interactionType", "https://schema.org/BookmarkAction",
            "userInteractionCount", post.getBookmarkedByUsers() != null ? post.getBookmarkedByUsers().size() : 0
        );

        return PostJsonLd.builder()
            .context("https://schema.org")
            .type("SocialMediaPosting")
            .identifier(post.getId().toString())
            .text(post.getContent())
            .datePublished(post.getCreatedAt().toString())
            .author(Map.of(
                "@type", "Person",
                "identifier", post.getUser().getId().toString(),
                "name", post.getUser().getUsername()
            ))
            .image(post.getImageUrl() != null ? post.getImageUrl() : "")
            .interactionStatistics(interactionStats)
            .keywords(post.getTags() != null ? 
                post.getTags().stream()
                    .map(Tag::getName)
                    .toArray(String[]::new) 
                : new String[0])
            .trainingProgram(post.getTrainingProgram() != null ? Map.of(
                "@type", "ExercisePlan",
                "identifier", post.getTrainingProgram().getId().toString(),
                "name", post.getTrainingProgram().getTitle(),
                "description", post.getTrainingProgram().getDescription(),
                "instructor", post.getTrainingProgram().getTrainer().getUsername()
            ) : null)
            .build();
    }

}
