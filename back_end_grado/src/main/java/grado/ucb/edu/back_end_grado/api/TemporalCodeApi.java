package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TemporalCodeBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TemporalCodeRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.TemporalCodeResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"temporal-code")
public class TemporalCodeApi {
    @Autowired
    private TemporalCodeBl temporalCodeBl;
    private static final Logger LOG = LoggerFactory.getLogger(TemporalCodeApi.class);

    // Create new temporal code if your role is "COORDINADOR" o "DIRECTOR"
    @PostMapping("/")
    public ResponseEntity<Object> postNewTemporalCode(@RequestBody UsersRequest usersRequest){
        Object finalResponse = temporalCodeBl.newTemporalCode(usersRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Código temporal creado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nuevo código temporal - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Check if temporal code is active and in time
    @GetMapping("/code")
    public ResponseEntity<Object> checkTemporalCode(@RequestParam("temporalCode") final String temporalCode){
        TemporalCodeRequest request = new TemporalCodeRequest();
        request.setTemporalCode(temporalCode);
        Object finalResponse = temporalCodeBl.getActiveTemporalCode(request);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Código temporal válido");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Código temporal invalido - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest path = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = path.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
