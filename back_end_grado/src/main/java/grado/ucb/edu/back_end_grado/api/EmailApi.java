package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.EmailBl;
import grado.ucb.edu.back_end_grado.persistence.entity.EmailRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Globals.apiVersion+"email")
public class EmailApi {

    private static final Logger LOG = LoggerFactory.getLogger(EmailApi.class);

    @Autowired
    private EmailBl emailBl;

    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        LOG.info("Enviando email a: " + emailRequest.getTo());

        try {
            emailBl.sendHtmlEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            LOG.info("Email sent successfully");
            return "Email sent successfully";
        } catch (MessagingException e) {
            LOG.error("Error sending email: " + e.getMessage());
            return "Error sending email: " + e.getMessage();
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmailRequest {
        private String to;
        private String subject;
        private String body;
    }
}
