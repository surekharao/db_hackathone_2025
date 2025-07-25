package tfl.hackathon;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Configuration
public class ApplicationConfig {

    @Value("${gemini.deploy.local}")
    private Boolean deployLocal;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")     // Allow all origins
                        .allowedMethods("*")     // Allow all HTTP methods
                        .allowedHeaders("*");    // Allow all headers
            }
        };
    }

    @Bean
    public Client client() throws IOException {
        return Client.builder()
                .project("hack-team-tfl")
                .location("us-central1")
                .credentials(getCredentials())
                .vertexAI(true)
                .build();
    }

    private GoogleCredentials getCredentials() throws IOException {
        if (deployLocal) {
            var accessToken = accessToken();
            return GoogleCredentials.newBuilder()
                    .setAccessToken(AccessToken.newBuilder()
                            .setTokenValue(accessToken)
                            .build())
                    .build();
        } else {
            return GoogleCredentials.getApplicationDefault();
        }

    }

    private String accessToken() throws IOException {
        ProcessBuilder pb = new ProcessBuilder("gcloud", "auth", "print-access-token");
        Process process = pb.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        return reader.readLine();
    }
}
