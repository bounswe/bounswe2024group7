package com.group7.demo.services;

import com.group7.demo.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<String> getAllTagNames() {
        // Fetch all tags and map to their names
        return tagRepository.findAll()
                .stream()
                .map(tag -> tag.getName())
                .toList();
    }
}