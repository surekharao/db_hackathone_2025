package tfl.hackathon;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.genai.Client;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {
//    @Value("${gemini.api.key}")
//    private String apiKey;

    @Value("${gemini.access.token}")
    private String accessToken;

    @Bean
    public Client client() {
        return Client.builder()
                .project("hack-team-tfl")
                .location("europe-west4")
                .credentials(GoogleCredentials.newBuilder()
                        .setAccessToken(AccessToken.newBuilder()
                                .setTokenValue(Base64Util.decode(accessToken))
                                .setTokenValue(accessToken)
                                .build())
                        .build())
                .vertexAI(true)
                .build();
        //return Client.builder().apiKey(apiKey).build();
    }
}
