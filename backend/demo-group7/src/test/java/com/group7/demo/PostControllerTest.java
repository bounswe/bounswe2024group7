package com.group7.demo;

import com.group7.demo.controllers.PostController;
import com.group7.demo.dtos.PostRequest;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.services.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class PostControllerTest {

    @Mock
    private PostService postService;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createPost_Success() {
        // Arrange
        PostRequest postRequest = new PostRequest();
        postRequest.setContent("Test content");
        postRequest.setTags(Set.of("fitness", "health"));

        PostResponse expectedResponse = PostResponse.builder()
                .id(1L)
                .content("Test content")
                .tags(Set.of("fitness", "health"))
                .createdAt(LocalDateTime.now())
                .build();

        when(postService.createPost(any(PostRequest.class), any(HttpServletRequest.class)))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<PostResponse> response = postController.createPost(postRequest, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedResponse, response.getBody());
        verify(postService).createPost(eq(postRequest), eq(request));
    }

    @Test
    void fetchPosts_WithTags() {
        // Arrange
        Set<String> tags = Set.of("fitness", "health");
        List<PostResponse> expectedPosts = Arrays.asList(
                PostResponse.builder().id(1L).build(),
                PostResponse.builder().id(2L).build()
        );

        when(postService.getPostsByTags(tags, request)).thenReturn(expectedPosts);

        // Act
        ResponseEntity<List<PostResponse>> response = postController.fetchPosts(tags, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedPosts, response.getBody());
        verify(postService).getPostsByTags(tags, request);
    }

    @Test
    void fetchPosts_WithoutTags() {
        // Arrange
        List<PostResponse> expectedPosts = Arrays.asList(
                PostResponse.builder().id(1L).build(),
                PostResponse.builder().id(2L).build()
        );

        when(postService.getAllPosts(request)).thenReturn(expectedPosts);

        // Act
        ResponseEntity<List<PostResponse>> response = postController.fetchPosts(null, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedPosts, response.getBody());
        verify(postService).getAllPosts(request);
    }

    @Test
    void deletePost_Success() throws IllegalAccessException {
        // Arrange
        Long postId = 1L;
        doNothing().when(postService).deletePost(postId, request);

        // Act
        ResponseEntity<String> response = postController.deletePost(postId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Post deleted successfully.", response.getBody());
        verify(postService).deletePost(postId, request);
    }

    @Test
    void deletePost_Unauthorized() throws IllegalAccessException {
        // Arrange
        Long postId = 1L;
        doThrow(new IllegalAccessException("Unauthorized")).when(postService).deletePost(postId, request);

        // Act
        ResponseEntity<String> response = postController.deletePost(postId, request);

        // Assert
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        verify(postService).deletePost(postId, request);
    }

    @Test
    void getRandomPosts_Success() {
        // Arrange
        int count = 5;
        List<PostResponse> expectedPosts = Arrays.asList(
                PostResponse.builder().id(1L).build(),
                PostResponse.builder().id(2L).build()
        );

        when(postService.getRandomPosts(count, request)).thenReturn(expectedPosts);

        // Act
        ResponseEntity<List<PostResponse>> response = postController.getRandomPosts(count, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedPosts, response.getBody());
        verify(postService).getRandomPosts(count, request);
    }

    @Test
    void likePost_Success() {
        // Arrange
        Long postId = 1L;
        doNothing().when(postService).likePost(postId, request);

        // Act
        ResponseEntity<Void> response = postController.likePost(postId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(postService).likePost(postId, request);
    }

    @Test
    void unlikePost_Success() {
        // Arrange
        Long postId = 1L;
        doNothing().when(postService).unlikePost(postId, request);

        // Act
        ResponseEntity<Void> response = postController.unlikePost(postId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(postService).unlikePost(postId, request);
    }

    @Test
    void getBookmarkedPosts_Success() {
        // Arrange
        List<PostResponse> expectedPosts = Arrays.asList(
                PostResponse.builder().id(1L).build(),
                PostResponse.builder().id(2L).build()
        );

        when(postService.getBookmarkedPosts(request)).thenReturn(expectedPosts);

        // Act
        ResponseEntity<List<PostResponse>> response = postController.getBookmarkedPosts(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedPosts, response.getBody());
        verify(postService).getBookmarkedPosts(request);
    }
}
