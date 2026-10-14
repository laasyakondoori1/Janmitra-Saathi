package com.janmitra.web;

import com.janmitra.model.User;
import com.janmitra.repo.UserRepository;
import com.janmitra.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    public record RegisterReq(@NotBlank String name, @Email @NotBlank String email, @Size(min = 6) String password) {}
    public record LoginReq(@NotBlank String email, @NotBlank String password) {}

    private final UserRepository users; private final PasswordEncoder enc; private final JwtService jwt;
    public AuthController(UserRepository users, PasswordEncoder enc, JwtService jwt) {
        this.users = users; this.enc = enc; this.jwt = jwt;
    }

    @PostMapping("/register")
    Map<String, Object> register(@Valid @RequestBody RegisterReq r) {
        if (users.findByEmail(r.email().toLowerCase()).isPresent())
            throw new IllegalArgumentException("This email is already registered");
        User u = new User();
        u.name = r.name(); u.email = r.email().toLowerCase();
        u.password = enc.encode(r.password()); u.role = "CITIZEN";
        return token(users.save(u));
    }

    @PostMapping("/login")
    Map<String, Object> login(@Valid @RequestBody LoginReq r) {
        User u = users.findByEmail(r.email().toLowerCase())
                .filter(x -> enc.matches(r.password(), x.password))
                .orElseThrow(() -> new IllegalArgumentException("Incorrect email or password"));
        return token(u);
    }

    private Map<String, Object> token(User u) {
        return Map.of("token", jwt.create(u), "name", u.name, "role", u.role);
    }
}
