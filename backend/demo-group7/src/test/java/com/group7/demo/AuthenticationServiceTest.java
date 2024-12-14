package com.group7.demo;

import com.group7.demo.dtos.LoginRequest;
import com.group7.demo.dtos.LoginResponse;
import com.group7.demo.dtos.RegisterRequest;
import com.group7.demo.models.enums.Role;
import com.group7.demo.models.User;
import com.group7.demo.repository.UserRepository;
import com.group7.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister_Success() throws Exception {
        RegisterRequest request = new RegisterRequest("John Doe", "john@example.com", "john_doe", "123456", Role.TRAINER);
        when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");

        User savedUser = User.builder()
                .id(1L)
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password("encodedPassword")
                .role(request.getRole())
                .sessionToken("mockedSessionToken")
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        User result = authenticationService.register(request);

        assertNotNull(result);
        assertEquals("john_doe", result.getUsername());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_UsernameExists() {
        RegisterRequest request = new RegisterRequest("John Doe", "john@example.com", "john_doe", "123456", Role.TRAINER);
        when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.of(new User()));

        Exception exception = assertThrows(Exception.class, () -> authenticationService.register(request));

        assertEquals("Username already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLogin_Success() throws Exception {
        LoginRequest request = new LoginRequest("john_doe", "123456");
        User mockUser = User.builder()
                .id(1L)
                .username(request.getUsername())
                .password("encodedPassword")
                .sessionToken("mockedSessionToken")
                .build();

        when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(request.getPassword(), mockUser.getPassword())).thenReturn(true);

        LoginResponse response = authenticationService.login(request);

        assertNotNull(response);
        assertEquals("mockedSessionToken", response.getSessionToken());
        assertEquals("john_doe", response.getUsername());
    }

    @Test
    void testLogin_InvalidCredentials() {
        LoginRequest request = new LoginRequest("john_doe", "wrongPassword");
        User mockUser = User.builder()
                .username(request.getUsername())
                .password("encodedPassword")
                .build();

        when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(request.getPassword(), mockUser.getPassword())).thenReturn(false);

        Exception exception = assertThrows(Exception.class, () -> authenticationService.login(request));

        assertEquals("Invalid credentials", exception.getMessage());
    }

    @Test
    void testLogout_Success() {
        String sessionToken = "existingToken";
        User mockUser = User.builder()
                .username("john_doe")
                .sessionToken(sessionToken)
                .build();

        when(userRepository.findBySessionToken(sessionToken)).thenReturn(Optional.of(mockUser));

        authenticationService.logout(sessionToken);

        assertNull(mockUser.getSessionToken());
        verify(userRepository, times(1)).save(mockUser);
    }

    @Test
    void testGetAuthenticatedUser_LoggedInUser() {
        String sessionToken = "validToken";
        User mockUser = User.builder()
                .username("john_doe")
                .email("john@example.com")
                .role(Role.TRAINER)
                .sessionToken(sessionToken)
                .build();

        when(userRepository.findBySessionToken(sessionToken)).thenReturn(Optional.of(mockUser));

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("x-session-token")).thenReturn(sessionToken);

        LoginResponse response = authenticationService.getAuthenticatedUser(request);

        assertNotNull(response);
        assertEquals("john_doe", response.getUsername());
    }

    @Test
    void testGetAuthenticatedUser_GuestUser() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("x-session-token")).thenReturn(null);
        LoginResponse response = authenticationService.getAuthenticatedUser(request);
        assertNull(response);
    }

    @Test
    void testGetAuthenticatedUserInternal_LoggedInUser() {
        String sessionToken = "validToken";
        User mockUser = User.builder()
                .username("john_doe")
                .email("john@example.com")
                .role(Role.TRAINER)
                .sessionToken(sessionToken)
                .build();

        when(userRepository.findBySessionToken(sessionToken)).thenReturn(Optional.of(mockUser));

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("x-session-token")).thenReturn(sessionToken);

        User user = authenticationService.getAuthenticatedUserInternal(request);

        assertNotNull(user);
        assertEquals(mockUser.getUsername(), user.getUsername());
    }

    @Test
    void testGetAuthenticatedUserInternal_GuestUser() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("x-session-token")).thenReturn(null);
        User user = authenticationService.getAuthenticatedUserInternal(request);
        assertNull(user);
    }

}
