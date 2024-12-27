package com.group7.demo.dtos.jsonld;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class PostJsonLd {
    @JsonProperty("@context")
    private String context;
    
    @JsonProperty("@type")
    private String type;
    
    private String identifier;
    private String text;
    private String datePublished;
    
    @JsonProperty("author")
    private Map<String, String> author;
    
    private String image;
    
    @JsonProperty("interactionStatistic")
    private Map<String, Object>[] interactionStatistics;
    
    private String[] keywords;
    
    @JsonProperty("associatedProgram")
    private Map<String, Object> trainingProgram;
}
