package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PdfBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@RestController
@RequestMapping(Globals.apiVersion+"pdf")
public class PdfApi {

    private final PdfBl pdfBl;

    public PdfApi(PdfBl pdfBl) {
        this.pdfBl = pdfBl;
    }

    private static final Logger LOG = LoggerFactory.getLogger(PdfApi.class);



    @GetMapping("")
    public ResponseEntity<Object> generatePDF(@RequestParam("idGradePro") final Long idGradePro) {
        Object finalResponse = pdfBl.generatePublicDefenseAct(idGradePro);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: PDF generado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al generar PDF - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requesthttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requesthttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }


}
