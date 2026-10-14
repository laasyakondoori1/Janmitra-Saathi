package com.janmitra.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

/** Classifies a complaint, summarises it and suggests priority + department. */
@Service
public class AiService {
    public record Analysis(String category, String summary, String priority, String department) {}

    static final Map<String, String> DEPT = Map.of(
        "GARBAGE", "Sanitation", "ROAD", "Roads & Works", "WATER", "Water Board",
        "ELECTRICITY", "Electricity Department", "OTHER", "General Administration");

    private final String apiKey, model;
    private final RestClient http = RestClient.create();
    private final ObjectMapper om = new ObjectMapper();

    public AiService(@Value("${anthropic.api-key}") String apiKey, @Value("${anthropic.model}") String model) {
        this.apiKey = apiKey; this.model = model;
    }

    public Analysis analyze(String title, String description) {
        if (apiKey != null && !apiKey.isBlank()) {
            try { return viaModel(title, description); } catch (Exception e) { /* fall back below */ }
        }
        return viaKeywords(title, description);
    }

    private Analysis viaModel(String title, String description) throws Exception {
        String prompt = """
            You triage civic complaints for an Indian city. The complaint may be in English, Hindi or Telugu.
            Reply with ONLY a JSON object, no markdown:
            {"category":"GARBAGE|ROAD|WATER|ELECTRICITY|OTHER","summary":"one English sentence, max 25 words","priority":"LOW|MEDIUM|HIGH"}
            Use HIGH only for safety risks or health hazards.
            Title: %s
            Description: %s""".formatted(title, description);
        var body = Map.of("model", model, "max_tokens", 300,
                "messages", List.of(Map.of("role", "user", "content", prompt)));
        JsonNode res = http.post().uri("https://api.anthropic.com/v1/messages")
                .header("x-api-key", apiKey).header("anthropic-version", "2023-06-01")
                .contentType(MediaType.APPLICATION_JSON).body(body).retrieve().body(JsonNode.class);
        String text = res.path("content").get(0).path("text").asText().replaceAll("```json|```", "").trim();
        JsonNode j = om.readTree(text);
        String cat = j.path("category").asText("OTHER");
        if (!DEPT.containsKey(cat)) cat = "OTHER";
        String pr = j.path("priority").asText("MEDIUM");
        if (!List.of("LOW", "MEDIUM", "HIGH").contains(pr)) pr = "MEDIUM";
        return new Analysis(cat, j.path("summary").asText(title), pr, DEPT.get(cat));
    }

    private Analysis viaKeywords(String title, String description) {
        String t = (title + " " + description).toLowerCase();
        String cat = has(t, "garbage", "trash", "waste", "dustbin", "litter", "कचरा", "చెత్త") ? "GARBAGE"
                : has(t, "road", "pothole", "footpath", "traffic", "सड़क", "రోడ్") ? "ROAD"
                : has(t, "water", "pipeline", "leak", "drain", "sewage", "पानी", "నీరు") ? "WATER"
                : has(t, "electric", "power", "streetlight", "street light", "wire", "बिजली", "కరెంట్") ? "ELECTRICITY"
                : "OTHER";
        String pr = has(t, "urgent", "danger", "accident", "overflow", "live wire", "no water", "open manhole") ? "HIGH" : "MEDIUM";
        String s = description.length() > 140 ? description.substring(0, 140) + "…" : description;
        return new Analysis(cat, s, pr, DEPT.get(cat));
    }

    private static boolean has(String text, String... words) {
        for (String w : words) if (text.contains(w)) return true;
        return false;
    }
}
