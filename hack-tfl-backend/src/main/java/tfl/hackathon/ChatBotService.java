package tfl.hackathon;

import com.google.common.primitives.Bytes;
import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
    private final Client client;
    private final Map<String, Chat> chatSessions;
    private final String modelId;

    public ChatBotService(Client client, @Value("${gemini.model.id}") String modelId) {
        this.client = client;
        this.modelId = modelId;
        chatSessions = new HashMap<>();
    }

    public String chat(String userId, String message) {
        var chat = chatSessions.computeIfAbsent(userId, (key) -> client.chats.create(modelId));
        var response = chat.sendMessage(message);

        return response.text();
    }

    public List<String> history(String userId) {
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
}
