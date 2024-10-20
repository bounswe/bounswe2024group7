package com.group7.demo.dtos;

import com.group7.demo.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class UserProfileResponse {
    private String username;
    private String fullName;
    private Role role;
    private Set<String> followers;
    private Set<String> following;
}
