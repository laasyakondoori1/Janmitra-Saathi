package com.janmitra.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("complaints")
public class Complaint {
    public record StatusUpdate(String status, String note, String by, Instant at) {}

    @Id public String id;
    public String userId;
    public String title;
    public String description;
    public String category;    // set by AI: GARBAGE | ROAD | WATER | ELECTRICITY | OTHER
    public String summary;     // set by AI
    public String priority;    // set by AI: LOW | MEDIUM | HIGH
    public String department;  // suggested by AI, editable by officials
    public String status = "OPEN"; // OPEN | IN_PROGRESS | RESOLVED
    public String address;
    public Double lat, lng;
    public String imageData;   // small base64 data URL
    public Instant createdAt = Instant.now();
    public List<StatusUpdate> history = new ArrayList<>();
}
