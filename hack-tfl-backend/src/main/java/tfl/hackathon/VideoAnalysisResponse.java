package tfl.hackathon;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class VideoAnalysisResponse {
        private Map analysis;
}
