package com.group7.demo.controllers;

import com.group7.demo.services.HelloWorldService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HelloWorldController {

    private HelloWorldService helloWorldService;

    @GetMapping("/hello")
    public String helloWorld() {
        return helloWorldService.getHelloMessage();
    }
}