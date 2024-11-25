package com.group7.demo.controllers;

import com.group7.demo.services.SearchService;
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


//    @GetMapping("/search")
//    public ResponseEntity<Map<String, Object>> search(@RequestParam("q") String query) {
//        // Split the query into keywords by whitespace and filter out any empty strings
//        String[] keywords = query.split("\\s+");
//        List<String> keywordList = Arrays.stream(keywords)
//                .map(String::trim)
//                .filter(k -> !k.isEmpty())
//                .toList();
//
//        // Pass the keyword list to the service
//        Map<String, Object> results = searchService.search(keywordList);
//
//        return ResponseEntity.ok(results);
//    }
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam("q") String query) {
//        String[] keywords = query.split("\\s+");
//        List<String> keywordList = Arrays.stream(keywords)
//                .map(String::trim)
//                .filter(k -> !k.isEmpty())
//                .toList();

        Map<String, Object> results = searchService.search(query);

        return ResponseEntity.ok(results);
    }


}