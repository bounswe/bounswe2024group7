package com.group7.demo;

import com.group7.demo.controllers.SurveyController;
import com.group7.demo.dtos.SurveyRequest;
import com.group7.demo.dtos.SurveyResponse;
import com.group7.demo.services.SurveyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SurveyController.class)
public class SurveyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SurveyService surveyService;

    private SurveyRequest surveyRequest;
    private SurveyResponse surveyResponse;

    @BeforeEach
    public void setup() {
        surveyRequest = new SurveyRequest();
        surveyRequest.setFitnessGoals(Arrays.asList("Lose Weight", "Build Muscle"));
        surveyRequest.setFitnessLevel("Beginner");

        surveyResponse = SurveyResponse.builder()
                .id(1L)
                .username("testuser")
                .fitnessGoals(Arrays.asList("Lose Weight", "Build Muscle"))
                .fitnessLevel("Beginner")
                .build();
    }

    // Test for addSurvey
    @Test
    public void testAddSurvey() throws Exception {
        Mockito.when(surveyService.addSurvey(any(SurveyRequest.class), any())).thenReturn(surveyResponse);

        mockMvc.perform(post("/api/surveys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "fitnessGoals": ["Lose Weight", "Build Muscle"],
                                "fitnessLevel": "Beginner"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.fitnessGoals[0]").value("Lose Weight"))
                .andExpect(jsonPath("$.fitnessGoals[1]").value("Build Muscle"))
                .andExpect(jsonPath("$.fitnessLevel").value("Beginner"));
    }

    // Test for getSurveyByUser
    @Test
    public void testGetSurveyByUser() throws Exception {
        Mockito.when(surveyService.getSurveyForAuthenticatedUser(any())).thenReturn(surveyResponse);

        mockMvc.perform(get("/api/surveys/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.fitnessGoals[0]").value("Lose Weight"))
                .andExpect(jsonPath("$.fitnessGoals[1]").value("Build Muscle"))
                .andExpect(jsonPath("$.fitnessLevel").value("Beginner"));
    }

    // Test for getUserFitnessGoals
    @Test
    public void testGetUserFitnessGoals() throws Exception {
        List<String> fitnessGoals = Arrays.asList("Lose Weight", "Build Muscle");
        Mockito.when(surveyService.getUserFitnessGoals(any())).thenReturn(fitnessGoals);

        mockMvc.perform(get("/api/surveys/fitness-goals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("Lose Weight"))
                .andExpect(jsonPath("$[1]").value("Build Muscle"));
    }

    // Test for addFitnessGoals
    @Test
    public void testAddFitnessGoals() throws Exception {
        List<String> goals = Arrays.asList("Lose Weight", "Build Muscle");
        Mockito.when(surveyService.addFitnessGoals(eq(goals), any())).thenReturn(goals);

        mockMvc.perform(post("/api/surveys/fitness-goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("[\"Lose Weight\", \"Build Muscle\"]"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("Lose Weight"))
                .andExpect(jsonPath("$[1]").value("Build Muscle"));
    }

    // Test for removeFitnessGoals
    @Test
    public void testRemoveFitnessGoals() throws Exception {
        Mockito.doNothing().when(surveyService).removeFitnessGoals(any(), any());

        mockMvc.perform(delete("/api/surveys/fitness-goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("[\"Lose Weight\"]"))
                .andExpect(status().isOk());
    }
}
