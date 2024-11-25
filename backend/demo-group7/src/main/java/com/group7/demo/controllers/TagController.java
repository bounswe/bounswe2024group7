package com.group7.demo.controllers;

import com.group7.demo.services.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getAllTags() {
        // Call the service to get all tag names
        List<String> tags = tagService.getAllTagNames();
        return ResponseEntity.ok(tags);
    }
}