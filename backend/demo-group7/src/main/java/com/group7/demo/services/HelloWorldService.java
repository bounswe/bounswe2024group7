package com.group7.demo.services;


import org.springframework.stereotype.Service;

@Service
public class HelloWorldService {

    public String getHelloMessage() {
        return "Hello, World!";
    }
}