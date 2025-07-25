package com.example.gemini.service;

import com.example.gemini.dto.GeminiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import static com.example.gemini.util.GeminiConstant.PROMPT;

@Service
public class GeminiService implements GeminiServiceInt {

    private static final Logger log = LoggerFactory.getLogger(GeminiService.class);
    private static final ObjectMapper mapper = new ObjectMapper();
    @Value("${gemini.projectId}")
    private String projectId;

    @Value("${gemini.model}")
    private String model;

    @Value("${gemini.vertexApi}")
    private String vertexApi;

    @Value("${gemini.authenticationApi}")
    private String authApi;

    private static final String LOCATION = "us-central1";

    @Override
    public GeminiResponse analyzeVideo(MultipartFile file) throws Exception {
        byte[] videoBytes = file.getBytes();
        String base64Video = Base64.getEncoder().encodeToString(videoBytes);

        String endpoint = String.format(vertexApi,
                LOCATION, projectId, LOCATION, model);


        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                        "role", "user",
                        "parts", List.of(
                                Map.of("text", PROMPT),
                                Map.of("inlineData", Map.of(
                                        "mimeType", file.getContentType(),
                                        "data", base64Video
                                ))
                        )
                ))
        );

        GoogleCredentials creds = GoogleCredentials.getApplicationDefault().createScoped(authApi);
        creds.refreshIfExpired();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Authorization", "Bearer " + creds.getAccessToken().getTokenValue())
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(requestBody)))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String reply = mapper.readTree(response.body())
                .at("/candidates/0/content/parts/0/text").asText().replace("```json","").replace("```", "");

        return new GeminiResponse(mapper.readValue(reply, Map.class));
    }
}
