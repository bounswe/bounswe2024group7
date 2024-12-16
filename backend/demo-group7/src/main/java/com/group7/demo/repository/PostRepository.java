package com.group7.demo.repository;

import com.group7.demo.models.Post;
import com.group7.demo.models.Tag;
import com.group7.demo.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);

    @Query("SELECT DISTINCT p FROM Post p JOIN p.tags t WHERE t.name IN :tagNames")
    List<Post> findPostsByTags(@Param("tagNames") Set<String> tagNames);

    List<Post> findByBookmarkedByUsersContaining(User user);

    @Query("SELECT p FROM Post p " +
            "LEFT JOIN p.tags t " +
            "LEFT JOIN p.trainingProgram tp " +
            "WHERE " +
            "LOWER(p.content) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(tp.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.user.username) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Post> search(@Param("query") String query);

    @Query("SELECT p FROM Post p JOIN p.tags t WHERE t IN :tags")
    Page<Post> findAllByTagsIn(@Param("tags") Set<Tag> tags, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Post p JOIN p.tags t WHERE t.name IN :tagNames")
    Page<Post> findPostsByTagsWithPagination(@Param("tagNames") Set<String> tagNames, Pageable pageable);

    @Query("SELECT p FROM Post p LEFT JOIN p.tags t WHERE t IN :tags ORDER BY SIZE(p.likedByUsers) DESC")
    Page<Post> findAllByTagsInOrderByLikesDesc(@Param("tags") Set<Tag> tags, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Post p LEFT JOIN p.tags t WHERE t.name IN :tagNames ORDER BY SIZE(p.likedByUsers) DESC")
    Page<Post> findPostsByTagsWithPaginationOrderByLikesDesc(@Param("tagNames") Set<String> tagNames, Pageable pageable);

    @Query("SELECT p FROM Post p ORDER BY SIZE(p.likedByUsers) DESC")
    Page<Post> findAllOrderByLikesDesc(Pageable pageable);
}
