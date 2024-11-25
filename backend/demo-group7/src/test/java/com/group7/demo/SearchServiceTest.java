package com.group7.demo;
import com.group7.demo.controllers.SearchController;
import com.group7.demo.services.SearchService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SearchController.class)
class SearchServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SearchService searchService;

    @Test
    void testSearch() throws Exception {
        // Given
        String query = "fitness program";
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("posts", List.of("Post1", "Post2"));
        mockResponse.put("exercises", List.of("Exercise1", "Exercise2"));
        mockResponse.put("trainingPrograms", List.of("Program1", "Program2"));

        Mockito.when(searchService.search(eq(query), any(HttpServletRequest.class))).thenReturn(mockResponse);

        // When & Then
        mockMvc.perform(get("/api/search")
                        .param("q", query)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.posts").isArray())
                .andExpect(jsonPath("$.exercises").isArray())
                .andExpect(jsonPath("$.trainingPrograms").isArray());
    }
}
