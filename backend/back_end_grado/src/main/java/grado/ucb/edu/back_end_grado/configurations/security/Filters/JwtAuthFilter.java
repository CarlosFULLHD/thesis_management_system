//package grado.ucb.edu.back_end_grado.configurations.security.Filters;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import grado.ucb.edu.back_end_grado.configurations.security.Jwt.JwtUtils;
//import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.slf4j.ILoggerFactory;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//public class JwtAuthFilter extends UsernamePasswordAuthenticationFilter {
//
//    private static final Logger LOG = LoggerFactory.getLogger(JwtAuthFilter.class);
//
//    private JwtUtils jwtUtils;
//
//
//
//    public  JwtAuthFilter(JwtUtils jwtUtils) {
//        this.jwtUtils = jwtUtils;
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        PersonEntity personEntity;
//
//        try {
//            personEntity = new ObjectMapper().readValue(request.getInputStream(), PersonEntity.class);
//            String email = personEntity.getEmail();
//
//            LOG.info("Email encontrado: " + personEntity.getEmail());
//
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null);
//
//            LOG.warn("Token de autenticacion: " + authenticationToken);
//
//            return getAuthenticationManager().authenticate(authenticationToken);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//        User user = (User) authResult.getPrincipal(); // Objeto que contiene todos los detalles del usuario
//        /*String token = jwtUtils.generateAccesToken(user.getUsername());
//
//        response.addHeader("Authorization", token);
//
//        Map<String, Object> httpResponse = new HashMap<>();
//        httpResponse.put("token", token);
//        httpResponse.put("Message", "Autenticacion correcta");
//        httpResponse.put("Username", user.getUsername());
//
//        response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
//        response.setStatus(HttpStatus.OK.value());
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.getWriter().flush();
//*/
//        super.successfulAuthentication(request, response, chain, authResult);
//    }
//}
