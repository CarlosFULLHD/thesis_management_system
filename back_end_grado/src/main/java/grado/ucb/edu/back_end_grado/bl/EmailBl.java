//package grado.ucb.edu.back_end_grado.bl;
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailBl {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        helper.setFrom("tallergradoucb@gmail.com");
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(htmlBody, true);
//
//        mailSender.send(message);
//    }
//}
