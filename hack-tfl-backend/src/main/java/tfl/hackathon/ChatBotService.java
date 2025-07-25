package tfl.hackathon;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.primitives.Bytes;
import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class ChatBotService {
    private static final Logger logger = LoggerFactory.getLogger(ChatBotService.class);
        private final Client client;
    private final Map<String, Chat> chatSessions;
    private final String modelId;
    private static final String VIDEO_ANALYSIS_PROMPT =
            """
            You will receive a video or an audio file. It is a startup pitch. Please do the following:
                1. Transcribe the pitch  in plain text in one string value and not an array.
                2. Summarize the speaker’s tone (confident, unsure, passionate, etc).
                3. Does it feel authentic and trustworthy? (Yes/No, why?)
                4. Provide the location, name of the shops and text in the signs and boards
                5. Provide other aspects like the crowd
                6. Provide a 2–3 line business potential assessment.
            Return in JSON format.
            """;
    private static final Map<String, String> PROMPTS = Map.of(
            "loan", """
                    You are a virtual agent with extensive knowledge of business loans. Your primary goal is to collect necessary information from business loan applicants to assess their loan eligibility and calculate their risk score
                    
                    Follow these steps to gather information from the business loan applicant
                    1. Begin by introducing yourself and explaining that you need to collect some information to access their loan eligibility and calculate their risk score
                    2. Ask a maximum of 10 relevant questions. Ensure each question is clear and concise. Ask one question at a time.
                    3. Inquire about the following details, providing examples to guide the applicant.
                        * Applicant Name
                        * Age Range
                        * Loan Amount
                        * Loan Tenure
                        * Business Description
                        * Business Address
                        * Outstanding Loans
                        * Academic Qualification
                        * Employment History
                        * Past Business Ventures
                    4. After gathering all the necessary information, calculate the risk score based on the information provided and provide a summary to the applicant in the format described in the examples
                    
                    **Example Inputs and Outputs:**
                    
                    Example Input:
                    I am Tasha. 50 years old Female and have completed Graduation. I am Married with 2 Dependants and had a previous business of cake making. I do not have any existing unpaid loans neither I have not defaulted any previous loans  so far. I need a loan of 10000 SGD for a tenure of 10 years to open a bakery business. My credit score based on my cashflow is 750.
                    
                    Example Output:
                    Risk Score: 1, Potential Credit: SGD 8000, Potential Tenure: 8 years, Interest Rate: 7%, Reject Reason: None
                    
                    ---
                    
                    Example Input:
                    I am Soon, 50 years old Male and have no formal education. I am Married with 3 Dependants and had a previous business of cycle repair. I have an existing unpaid loan of 3000 SGD but have not defaulted any previous loans so far. I need a loan of 15000 SGD for a tenure of 15 years to expand my cycle repair business. My credit score based on my cashflow is 350.
                    
                    Example Output:
                    Risk Score: 1, Potential Credit: SGD 8000, Potential Tenure: 8 years, Interest Rate: 7%, Reject Reason: None
                    
                    **Instructions for Output:**
                    - Always use the output format above.
                    - If "Reject Reason" is "None", you may hide it.
                    
                    """,
            "game", """
                    You are a highly skilled and persuasive sales agent with exceptional convincing abilities. Your goal is to create a compelling bait pitch that encourages loan applicants to play a game on the application to accumulate points.
                    
                    You will be provided with the following customer details:
                    
                    Customer Name: "Joe"
                    Loan Amount: "$10000"
                    Interest Rate: "7.3%"
                    Loan Terms: "5 years"
                    Game Benefits: "better interest rate"
                    
                    Instructions:
                    
                    1.Craft a personalized bait pitch to convince the customer to play the game on the application.
                    2.Start by acknowledging the customer's loan application and expressing excitement about the opportunity to assist them.
                    3.Introduce the game as a fun and easy way to potentially reduce their interest rate or gain other benefits.
                    4.Clearly explain the benefits of playing the game, such as earning points that can be redeemed for discounts, lower interest rates, or other rewards.
                    5.Emphasize that playing the game is optional but highly recommended to maximize their chances of getting the best possible loan terms.
                    6.Use persuasive language and highlight the potential positive outcomes for the customer.
                    7.End with a call to action, encouraging the customer to start playing the game immediately.
                    8.Maintain an enthusiastic, persuasive, and customer-focused tone throughout the pitch.
                    """,
            "tutor", """
                    You are a highly skilled and persuasive sales agent with exceptional convincing abilities. Your goal is to persuade customers to try the free value-added service provided by our pitching tutor. The pitching tutor will guide the customer to improve their business pitching and improve their prospects of getting investors on our platform.
                    
                    To achieve your goal, please consider the following information:
                    
                    Customer Profile: {customer_profile}
                    Pitching Tutor Details: {pitching_tutor_details}
                    Value Proposition: {value_proposition}
                    Success Stories: {success_stories}
                    
                    Instructions:
                    1. Analyze the customer profile to understand their needs and pain points.
                    2. Introduce the pitching tutor service, highlighting its key benefits and features.
                    3. Clearly articulate the value proposition, emphasizing how the service can help the customer improve their business pitching and attract investors.
                    4. Share relevant success stories to build credibility and demonstrate the effectiveness of the pitching tutor.
                    5. Craft a compelling call to action, encouraging the customer to try the service and take the next step towards achieving their goals.
                    6. Provide 3 line summary of better pitching script
                    
                    Here are some additional tips to enhance your persuasive abilities:
                    * Use a confident and enthusiastic tone.
                    * Tailor your message to the specific customer and their unique circumstances.
                    * Address any potential objections or concerns proactively.
                    
                    Remember, your ultimate goal is to convince the customer that the pitching tutor service is a valuable investment that will significantly improve their chances of success.
                    """
    );

    public ChatBotService(Client client, @Value("${gemini.model.id}") String modelId) {
        this.client = client;
        this.modelId = modelId;
        chatSessions = new HashMap<>();
    }

    public ChatResponse chat(String userId, String message) {

        var chat = chatSessions.computeIfAbsent(userId, (key) -> client.chats.create(modelId));
        logger.info("Sending chat message: {}", message);
        var response = chat.sendMessage(message);

        return new ChatResponse(response.text());
    }

    public ChatResponse prompt(String userId, String message, String type) {
        var chat = chatSessions.computeIfAbsent(userId, (key) -> client.chats.create(modelId));

        logger.info("Sending {} prompt with message: {}", type, message);
        var response = chat.sendMessage(message, GenerateContentConfig.builder()
                        .systemInstruction(Content.fromParts(Part.fromText(PROMPTS.get(type))))
                .build());

        return new ChatResponse(response.text());
    }

    public List<String> history(String userId) {
        logger.info("Retrieving chat history for: {}", userId);
        var chat = chatSessions.get(userId);
        if (chat != null) {
            var history = chat.getHistory(true);
            return history.stream().map(Content::text).toList();
        }
        return List.of();
    }

    public byte[] audioChatWithBytes(String userId, String fileUri, String mimeType) {
        var part = Part.builder().fileData(FileData.builder().fileUri(fileUri).mimeType(mimeType).build()).build();
        var content = Content.builder().parts(part).build();

        var chat = chatSessions.computeIfAbsent(userId, (key) -> client.chats.create(modelId));
        var response = chat.sendMessage(content, GenerateContentConfig.builder()
                .responseModalities("AUDIO")
                .speechConfig(SpeechConfig.builder()
                        .voiceConfig(VoiceConfig.builder()
                                .prebuiltVoiceConfig(PrebuiltVoiceConfig.builder().voiceName("Kore").build())
                                .build())
                        .build())
                .build());

        List<Blob> parts = response.parts().stream().map(Part::inlineData).map(Optional::get).toList();


        // ... (assuming combinedAudioBytes contains the raw audio data)
        byte[] combinedAudioBytes =
                parts.stream().map(b -> b.data()).map(Optional::get).reduce((a, b) -> Bytes.concat(a, b)).orElse(null);
        return combinedAudioBytes;
    }

    public String audioChatAsFile(String userId, String fileUri, String mimeType) {
        var combinedAudioBytes = audioChatWithBytes(userId, fileUri, mimeType);

        // Define the AudioFormat (adjust parameters as needed for your Blob's audio)
        float sampleRate = 44100; // Example: 44.1 kHz
        int sampleSizeInBits = 16; // Example: 16-bit
        int channels = 1; // Example: Mono
        boolean signed = true; // Example: Signed audio
        boolean bigEndian = false; // Example: Little-endian

        AudioFormat format = new AudioFormat(sampleRate, sampleSizeInBits, channels, signed, bigEndian);
        AudioInputStream audioInputStream = new AudioInputStream(new ByteArrayInputStream(combinedAudioBytes), format, combinedAudioBytes.length / format.getFrameSize());

        try {
            var uuid = UUID.randomUUID().toString();
            File wavFile = new File(uuid + ".wav");
            AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, wavFile);
            System.out.println("WAV file created successfully!");
            return wavFile.getPath();
        } catch (IOException e) {
            throw new RuntimeException();
        } finally {
            try {
                audioInputStream.close(); // Close the AudioInputStream
            } catch (IOException e) {
                throw new RuntimeException();
            }
        }
    }

    public VideoAnalysisResponse analyzeVideo(String userId, MultipartFile file) {
        try {
            byte[] videoBytes = file.getBytes();
            String mimeType = file.getContentType();

            logger.info("Sending video for analysis: {}", file.getOriginalFilename());
            var content = Content.fromParts(Part.fromText(VIDEO_ANALYSIS_PROMPT), Part.fromBytes(videoBytes, mimeType));
            var response = client.models.generateContent(modelId, content, null).text();

            ObjectMapper mapper = new ObjectMapper();
            String json = response.substring(response.indexOf("{"), response.lastIndexOf("}") + 1);
            Map result = mapper.readValue(json, HashMap.class);
            return new VideoAnalysisResponse(result);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
