package com.example.gemini.controller;

import com.example.gemini.dto.GeminiResponse;
import com.example.gemini.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/video")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/analyze")
    public ResponseEntity<GeminiResponse> analyze(@RequestParam("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(geminiService.analyzeVideo(file));
    }
}
