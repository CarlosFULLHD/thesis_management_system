package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(Globals.apiVersion+"reCaptcha")
public class ReCaptchaApi {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/")
    public ResponseEntity<?> verifyCaptcha(@RequestBody Map<String, String> payload){
        String captchaValue = (String) payload.get("captchaValue");
        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + Globals.reCaptchaSiteSecret+ "&response=" + captchaValue;
        Map<String, String> body = new HashMap<>();
        ResponseEntity<?> response = restTemplate.postForEntity(url, body, Map.class);
        return response;
    }
}
