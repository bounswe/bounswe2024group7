package com.group7.demo;

import com.group7.demo.models.Tag;
import com.group7.demo.repository.TagRepository;
import com.group7.demo.services.TagService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    private TagService tagService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tagService = new TagService(tagRepository);
    }

    @Test
    void testGetAllTagNames() {
        // Given
        List<Tag> mockTags = Arrays.asList(
                Tag.builder().name("Fitness").build(),
                Tag.builder().name("Health").build(),
                Tag.builder().name("Wellness").build()
        );
        when(tagRepository.findAll()).thenReturn(mockTags);

        // When
        List<String> tagNames = tagService.getAllTagNames();

        // Then
        assertEquals(3, tagNames.size());
        assertEquals(List.of("Fitness", "Health", "Wellness"), tagNames);
    }
}
