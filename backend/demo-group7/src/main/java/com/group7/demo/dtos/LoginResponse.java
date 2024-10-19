package com.group7.demo.dtos;

import com.group7.demo.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String sessionToken;
    private Role role;
    private String username;
    private String email;
}
