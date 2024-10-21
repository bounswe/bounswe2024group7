package com.group7.demo.repository;

import com.group7.demo.dtos.PostResponse;
import com.group7.demo.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTags_Name(String tagName);

    @Query("SELECT p.id, p.content, p.createdAt, t.name FROM Post p LEFT JOIN p.tags t")
    List<Object[]> findAllPostDataWithTags();

    @Query("SELECT DISTINCT p FROM Post p LEFT JOIN FETCH p.tags")
    List<Post> findAllPostsWithTags();


}
