package com.group7.demo.controllers;

import com.group7.demo.services.SearchService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam("q") String query, HttpServletRequest request) {

        Map<String, Object> results = searchService.search(query, request);

        return ResponseEntity.ok(results);
    }


}