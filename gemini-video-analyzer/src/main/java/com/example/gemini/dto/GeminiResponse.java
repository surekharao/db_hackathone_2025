package com.example.gemini.dto;

import java.util.Map;

public class GeminiResponse {
    private Map analysis;

    public GeminiResponse(Map analysis) {
        this.analysis = analysis;
    }

    public Map getAnalysis() {
        return analysis;
    }

    public void setAnalysis(Map analysis) {
        this.analysis = analysis;
    }
}
