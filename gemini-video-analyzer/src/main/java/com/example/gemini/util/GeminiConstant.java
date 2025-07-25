package com.example.gemini.util;

public class GeminiConstant {


    public static final String PROMPT = "You will receive a video or an audio file. It is a startup pitch. Please do the following:\n" +
            "1. Transcribe the pitch  in plain text in one string value and not an array.\n"+
            "2. Summarize the speaker’s tone (confident, unsure, passionate, etc).\n" +
            "3. Does it feel authentic and trustworthy? (Yes/No, why?)\n" +
            "4. Provide the location, name of the shops and text in the signs and boards\n" +
            "5. Provide other aspects like the crowd, atmosphere\n" +
            "6. Provide permanent image of the main actor to view in browser\n" +
            "7. Provide a 2–3 line business potential assessment.Put in a field business_potential_assessment\n" +
            "8. Provide the business potential assessment in one of the 3 formats STRONG, MEDIUM, LOW. Put in a field business_potential.\n" +
            "9. Return in this JSON format. {\"transcription\": \"\",\"speaker_tone\": \"\",\"is_authentic_and_trustworthy\": \"\",\"location_shops_and_signs\": {\"location\": \"\",\"shops\": [{\"name\": \"\",\"items\": [\"\"]}],\"boards\": [\"\"]},\"other_aspects\": {\"crowd\": \"\",\"atmosphere\": \"\"},\"main_actor_image\": \"\",\"business_potential_assessment\": \"\",\"business_potential\": \"\"}";
}
