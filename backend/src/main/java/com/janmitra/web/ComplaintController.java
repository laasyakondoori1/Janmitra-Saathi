package com.janmitra.web;

import com.janmitra.model.Complaint;
import com.janmitra.repo.ComplaintRepository;
import com.janmitra.service.AiService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class ComplaintController {
    public record CreateReq(@NotBlank String title, @NotBlank String description,
                            String address, Double lat, Double lng, String imageData) {}
    public record UpdateReq(@NotBlank String status, String department, String note) {}

    private final ComplaintRepository repo; private final AiService ai;
    public ComplaintController(ComplaintRepository repo, AiService ai) { this.repo = repo; this.ai = ai; }

    @PostMapping("/complaints")
    Complaint create(@Valid @RequestBody CreateReq r, Authentication auth) {
        var a = ai.analyze(r.title(), r.description());
        Complaint c = new Complaint();
        c.userId = auth.getName(); c.title = r.title(); c.description = r.description();
        c.address = r.address(); c.lat = r.lat(); c.lng = r.lng(); c.imageData = r.imageData();
        c.category = a.category(); c.summary = a.summary(); c.priority = a.priority(); c.department = a.department();
        c.history.add(new Complaint.StatusUpdate("OPEN", "Complaint received and routed to " + c.department, "JanMitra", Instant.now()));
        return repo.save(c);
    }

    @GetMapping("/complaints/mine")
    List<Complaint> mine(Authentication auth) { return repo.findByUserIdOrderByCreatedAtDesc(auth.getName()); }

    @GetMapping("/complaints/{id}")
    Complaint one(@PathVariable String id, Authentication auth) {
        Complaint c = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
        if (!c.userId.equals(auth.getName()) && !isAdmin(auth)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your complaint");
        return c;
    }

    @GetMapping("/admin/complaints")
    List<Complaint> all(@RequestParam(required = false) String status) {
        return (status == null || status.isBlank()) ? repo.findAllByOrderByCreatedAtDesc() : repo.findByStatusOrderByCreatedAtDesc(status);
    }

    @PatchMapping("/admin/complaints/{id}")
    Complaint update(@PathVariable String id, @Valid @RequestBody UpdateReq r) {
        Complaint c = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
        if (!List.of("OPEN", "IN_PROGRESS", "RESOLVED").contains(r.status())) throw new IllegalArgumentException("Invalid status");
        c.status = r.status();
        if (r.department() != null && !r.department().isBlank()) c.department = r.department();
        c.history.add(new Complaint.StatusUpdate(r.status(), r.note() == null ? "" : r.note(), "Official", Instant.now()));
        return repo.save(c);
    }

    @GetMapping("/admin/stats")
    Map<String, Object> stats() {
        List<Complaint> all = repo.findAll();
        return Map.of("total", all.size(),
            "byStatus", all.stream().collect(Collectors.groupingBy(c -> c.status, Collectors.counting())),
            "byCategory", all.stream().collect(Collectors.groupingBy(c -> c.category, Collectors.counting())));
    }

    private boolean isAdmin(Authentication a) {
        return a.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ROLE_ADMIN"));
    }
}
