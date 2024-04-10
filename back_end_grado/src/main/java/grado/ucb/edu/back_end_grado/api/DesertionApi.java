package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.DesertionRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import grado.ucb.edu.back_end_grado.bl.DesertionBl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import grado.ucb.edu.back_end_grado.util.Globals;

import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"desertion")
public class DesertionApi {

    private final DesertionBl desertionBl;
    private static final Logger LOG = LoggerFactory.getLogger(DesertionApi.class);

    @Autowired
    public DesertionApi(DesertionBl desertionBl) {
        this.desertionBl = desertionBl;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDesertions() {
        Object response = desertionBl.getAllDesertionsBl();
        return generateResponse(response);
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getDesertionsByStatus(@PathVariable int status) {
        Object response = desertionBl.getDesertionsByStatus(status);
        return generateResponse(response);
    }
    @PostMapping("/accept/{idDesertion}")
    public ResponseEntity<?> acceptDesertion(@PathVariable Long idDesertion, @RequestBody String reason) {
        Object response = desertionBl.updateDesertionStatus(idDesertion, 1, reason); // 1 para aceptado
        return generateResponse(response);
    }
    @PostMapping("/reject/{idDesertion}")
    public ResponseEntity<?> rejectDesertion(@PathVariable Long idDesertion,@RequestBody String reason) {
        Object response = desertionBl.updateDesertionStatus(idDesertion, 2, reason); // 2 para rechazado
        return generateResponse(response);
    }
    @PostMapping("/application")
    public ResponseEntity<?> createDesertion(@RequestBody DesertionRequest request) {
        Object response = desertionBl.createDesertion(request);
        return generateResponse(response);
    }

    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            LOG.info("Operación realizada con éxito.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response instanceof UnsuccessfulResponse) {
            LOG.error("Operación fallida.");
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) response).setPath(requestPath);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            LOG.error("Respuesta desconocida.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}