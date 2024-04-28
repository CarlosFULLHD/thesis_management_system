package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(
        name ="API - Prueba Re-Captcha Google",
        description = "Endpoint el manejo y comprobación de prueba Re-Captcha Google"
)
public class ReCaptchaApi {

    private final RestTemplate restTemplate = new RestTemplate();
    @Operation(
            summary = "Verificar prueba Re-Captcha google",
            description = "Verificar si la prueba Re-Captcha es correcta o no"
    )
    @PostMapping("/")
    public ResponseEntity<?> verifyCaptcha(@RequestBody Map<String, String> payload){
        String captchaValue = (String) payload.get("captchaValue");
        String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + Globals.reCaptchaSiteSecret+ "&response=" + captchaValue;
        Map<String, String> body = new HashMap<>();
        ResponseEntity<?> response = restTemplate.postForEntity(url, body, Map.class);
        return response;
    }
}
