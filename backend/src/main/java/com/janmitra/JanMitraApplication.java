package com.janmitra;

import com.janmitra.model.User;
import com.janmitra.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class JanMitraApplication {
    public static void main(String[] args) { SpringApplication.run(JanMitraApplication.class, args); }

    /** Creates a default official account on first run. Change the password after logging in. */
    @Bean CommandLineRunner seedAdmin(UserRepository users, PasswordEncoder enc) {
        return args -> {
            if (users.findByEmail("admin@janmitra.in").isEmpty()) {
                User u = new User();
                u.name = "Municipal Officer"; u.email = "admin@janmitra.in";
                u.password = enc.encode("admin123"); u.role = "ADMIN";
                users.save(u);
            }
        };
    }
}
