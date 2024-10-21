package com.group7.demo.controllers;

import com.group7.demo.dtos.LoginRequest;
import com.group7.demo.dtos.LoginResponse;
import com.group7.demo.dtos.RegisterRequest;
import com.group7.demo.models.User;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            User registeredUser = authenticationService.register(request);
            // Return the session token in the response
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    registeredUser.getSessionToken()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authenticationService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<LoginResponse> getAuthenticatedUser(HttpServletRequest request) {
        LoginResponse loginResponse = authenticationService.getAuthenticatedUser(request);
        if (loginResponse != null) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestParam String sessionToken) {
        authenticationService.logout(sessionToken);
        return ResponseEntity.ok().build();
    }
}
