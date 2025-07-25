package com.example.gemini.util;

public class GeminiConstant {

    public static final String PROMPT = "You will receive a video or an audio file. It is a startup pitch. Please do the following:\n" +
            "1. Transcribe the pitch  in plain text in one string value and not an array.\n"+
            "2. Summarize the speaker’s tone (confident, unsure, passionate, etc).\n" +
            "3. Does it feel authentic and trustworthy? (Yes/No, why?)\n" +
            "4. Provide the location, name of the shops and text in the signs and boards\n" +
            "5. Provide other aspects like the crowd\n" +
            "6. Provide a 2–3 line business potential assessment.\nReturn in JSON format.";
}
