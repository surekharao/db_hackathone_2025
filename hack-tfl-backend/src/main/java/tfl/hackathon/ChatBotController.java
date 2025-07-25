package tfl.hackathon;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
public class ChatBotController {
    private final ChatBotService chatBotService;

    public ChatBotController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatBotService.chat(request.getUserId(), request.getMessage());
    }

    @PostMapping("/prompt")
    public ChatResponse prompt(@RequestBody ChatRequest request, @RequestParam String type) {
        return chatBotService.prompt(request.getUserId(), request.getMessage(), type);
    }

    @GetMapping("/chat-history")
    public List<String> getHistory(@RequestParam String userId) {
        return chatBotService.history(userId);
    }

    @PostMapping("/analyze-video")
    public VideoAnalysisResponse analyze(@RequestParam String userId, @RequestParam("file") MultipartFile file) throws Exception {
        return chatBotService.analyzeVideo(userId, file);
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
