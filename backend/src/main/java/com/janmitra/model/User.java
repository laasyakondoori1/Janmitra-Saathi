package com.janmitra.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    @Id public String id;
    public String name;
    @Indexed(unique = true) public String email;
    public String password;   // BCrypt hash
    public String role;       // CITIZEN | ADMIN
}
