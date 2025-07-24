package tfl.hackathon;

import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
public class ChatBotController {
private final ChatBotService chatBotService;

    public ChatBotController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody ChatRequest request) {
        return chatBotService.chat(request.getUserId(), request.getMessage());
    }

    @GetMapping("/chat-history")
    public List<String> getHistory(@RequestParam String userId) {
        return chatBotService.history(userId);
    }

    @PostMapping("/audio-chat")
    public ByteArrayInputStream audioChat(@RequestBody AudioChatRequest request) {
        return new ByteArrayInputStream(chatBotService.audioChatWithBytes(request.getUserId(), request.getFileUri(), request.getMimeType()));
    }

    @PostMapping("/audio-chat-as-file")
    public String audioChatAsFile(@RequestBody AudioChatRequest request) {
        return chatBotService.audioChatAsFile(request.getUserId(), request.getFileUri(), request.getMimeType());
    }
}
