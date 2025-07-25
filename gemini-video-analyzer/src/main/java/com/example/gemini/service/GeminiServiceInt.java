package com.example.gemini.service;

import com.example.gemini.dto.GeminiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface GeminiServiceInt {
    GeminiResponse analyzeVideo(MultipartFile file) throws Exception;
}
