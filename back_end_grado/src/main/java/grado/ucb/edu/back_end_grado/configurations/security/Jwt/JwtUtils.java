package grado.ucb.edu.back_end_grado.configurations.security.Jwt;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import grado.ucb.edu.back_end_grado.bl.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    private static final Logger LOG = LoggerFactory.getLogger(JwtUtils.class);
    
    @Value("${security.jwt.key.private}")
    private String privateKey;
    @Value("${security.jwt.user.generator}")
    private String userGenerator;


    // Create Acces Token
    public String createToken(Authentication authentication) {
        try {
            if (!(authentication.getPrincipal() instanceof CustomUserDetails)) {
                LOG.error("El principal no es una instancia de CustomUserDetails: {}", authentication.getPrincipal().getClass());
                throw new IllegalArgumentException("Principal can not be cast to CustomUserDetails");
            }

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            Algorithm algorithm = Algorithm.HMAC256(this.privateKey);

            Set<String> authorities = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            LOG.info("Autoridades: {}", String.join(",", authorities));


            return JWT.create()
                    .withSubject(userDetails.getUsername())
                    .withClaim("userId", userDetails.getIdUsers())
                    .withClaim("name", userDetails.getFullName())
                    .withClaim("role", userDetails.getUserRole())
                    .withIssuer(this.userGenerator)
                    .withClaim("authorities", String.join(",", authorities))
                    .withIssuedAt(new Date())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 1800000)) // 30 minutos
                    .withJWTId(UUID.randomUUID().toString())
                    .withNotBefore(new Date(System.currentTimeMillis()))
                    .sign(algorithm);
        } catch (Exception e) {
            LOG.error("Error al crear el token JWT: {}", e.getMessage());
            throw new RuntimeException("Error al crear el token JWT", e);
        }
    }

    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.privateKey);

            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(this.userGenerator)
                    .build();

            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            LOG.error("Token invalido, no autorizado: {}", exception.getMessage());
            throw new JWTVerificationException("Token invalid, not Authorized");
        }
    }

    // Get username from token
    public String extractUsername(DecodedJWT decodedJWT) {
        return decodedJWT.getSubject();
    }

    public Claim getSpecificClaim(DecodedJWT decodedJWT, String claimName) {
        return decodedJWT.getClaim(claimName);
    }
}
