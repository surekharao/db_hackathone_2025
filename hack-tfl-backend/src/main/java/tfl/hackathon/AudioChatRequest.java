package tfl.hackathon;

import lombok.Data;

@Data
public class AudioChatRequest {
    String userId;
    String fileUri;
    String mimeType;
}
