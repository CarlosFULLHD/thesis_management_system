package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PublicInformationBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PublicInformationRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"publicInformation")
public class PublicInformationApi {
    private PublicInformationBl publicInformationBl;
    private static final Logger LOG = LoggerFactory.getLogger(PublicInformationApi.class);

    public PublicInformationApi(PublicInformationBl publicInformationBl) {
        this.publicInformationBl = publicInformationBl;
    }

    // New public information
    @PostMapping("/new")
    public Object postPublicInformation(@RequestBody PublicInformationRequest publicInformationRequest){
        Object finalResponse = publicInformationBl.newPublicInformation(publicInformationRequest);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Información pública registrada exitosamente");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva informacion pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Get all active public information (open to all public)
    @GetMapping("/")
    public Object getAllActivePublicInformation(){
        Object finalResponse = publicInformationBl.getAllActivePublicInformation();
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de información pública encontrados");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }
}
