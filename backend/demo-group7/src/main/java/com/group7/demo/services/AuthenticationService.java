package com.group7.demo.services;

import com.group7.demo.dtos.LoginRequest;
import com.group7.demo.dtos.LoginResponse;
import com.group7.demo.dtos.PostResponse;
import com.group7.demo.dtos.RegisterRequest;
import com.group7.demo.models.Post;
import com.group7.demo.models.Tag;
import com.group7.demo.models.User;
import com.group7.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) throws Exception {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }

        User newUser = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .sessionToken(UUID.randomUUID().toString())
                .build();
        return userRepository.save(newUser);
    }

    public LoginResponse login(LoginRequest request) throws Exception {
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (user.isPresent()) {
            User foundUser = user.get();
            if (passwordEncoder.matches(request.getPassword(), foundUser.getPassword())) {
                String sessionToken = foundUser.getSessionToken();
                // Generate a new session token if not already logged in
                if (sessionToken == null) {
                    sessionToken = UUID.randomUUID().toString();
                    foundUser.setSessionToken(sessionToken);
                    userRepository.save(foundUser);
                }
                return LoginResponse.builder()
                        .sessionToken(sessionToken)
                        .username(foundUser.getUsername())
                        .email(foundUser.getEmail())
                        .role(foundUser.getRole())
                        .build();
            } else {
                throw new Exception("Invalid credentials");
            }
        } else {
            throw new Exception("User not found");
        }
    }

    public User getAuthenticatedUserInternal(HttpServletRequest request) {
        String sessionToken = request.getHeader("x-session-token");
        if (sessionToken != null) {
            Optional<User> user = userRepository.findBySessionToken(sessionToken);
            if (user.isPresent()) {
                return user.get();
            }
        }
        return null;
    }

    public LoginResponse getAuthenticatedUser(HttpServletRequest request) {
        String sessionToken = request.getHeader("x-session-token");
        if (sessionToken != null) {
            Optional<User> user = userRepository.findBySessionToken(sessionToken);
            if (user.isPresent()) {
                User foundUser = user.get();
                return LoginResponse.builder()
                        .sessionToken(sessionToken)
                        .username(foundUser.getUsername())
                        .email(foundUser.getEmail())
                        .role(foundUser.getRole())
                        .build();
            }
        }
        return null;
    }

    public void logout(String sessionToken) {
        Optional<User> user = userRepository.findBySessionToken(sessionToken);
        user.ifPresent(foundUser -> {
            foundUser.setSessionToken(null);  // Invalidate the token
            userRepository.save(foundUser);
        });
    }

    private LoginResponse mapToLoginResponse(User user) {
        return LoginResponse.builder()
                .username(user.getUsername())
                .sessionToken(user.getSessionToken())
                .role(user.getRole())
                .email(user.getEmail())
                .build();
    }
}
