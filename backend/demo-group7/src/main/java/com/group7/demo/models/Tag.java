package com.group7.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(exclude = "posts")  // Avoid using posts in equals and hashCode to prevent recursion
public class Tag {

    @Id
    private String name;

    @ManyToMany(mappedBy = "tags")
//    @JsonIgnoreProperties("tags")  // Prevents infinite recursion with Post entity
    private Set<Post> posts = new HashSet<>();
}