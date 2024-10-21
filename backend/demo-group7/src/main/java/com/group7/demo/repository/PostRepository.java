package com.group7.demo.repository;

import com.group7.demo.models.Post;
import com.group7.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);

    @Query("SELECT DISTINCT p FROM Post p JOIN p.tags t WHERE t.name IN :tagNames")
    List<Post> findPostsByTags(@Param("tagNames") Set<String> tagNames);


}
