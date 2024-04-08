//package grado.ucb.edu.back_end_grado.api;
//
////import grado.ucb.edu.back_end_grado.bl.AuthBl;
//import grado.ucb.edu.back_end_grado.persistence.entity.EmailRequest;
//import grado.ucb.edu.back_end_grado.util.Globals;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping(Globals.apiVersion+"auth")
//public class AuthAPI {
//    private final AuthBl authBl;
//
//    @Autowired
//    public AuthAPI(AuthBl authBl) {
//        this.authBl = authBl;
//    }
//    private static final Logger LOG = LoggerFactory.getLogger(AuthAPI.class);
//
//    // Get role
//    /*Consulta
//        POST http://localhost:8080/api/v1/auth/getRole
//
//        {
//          "email": "estudiante@ucb.lapaz.com"
//        }
//    * */
//    @PostMapping("/getRole")
//    public ResponseEntity<String> getRole(@RequestBody EmailRequest emailRequest) {
//        String email = emailRequest.getEmail();
//        LOG.info("Email recibido: " + email);
//
//        String roleName = authBl.getRole(email);
//
//        if (roleName != null) {
//            return ResponseEntity.ok(roleName);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rol no encontrado para el email: " + email);
//        }
//    }
//}
//
