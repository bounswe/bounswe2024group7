package com.group7.demo.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customers")
@Data

public class Customer {

    //NO validations yet TODO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;


}