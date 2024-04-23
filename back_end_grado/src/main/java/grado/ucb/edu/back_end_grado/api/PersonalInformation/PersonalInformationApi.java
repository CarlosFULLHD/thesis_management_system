package grado.ucb.edu.back_end_grado.api.PersonalInformation;
import grado.ucb.edu.back_end_grado.bl.PersonalInfoBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonalInfoRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Globals.apiVersion + "professor/{professorId}/personal-info")
public class PersonalInformationApi {
    private final PersonalInfoBl personalInfoBl;
    private static final Logger LOG = LoggerFactory.getLogger(PersonalInformationApi.class);

    public PersonalInformationApi(PersonalInfoBl personalInfoBl) {
        this.personalInfoBl = personalInfoBl;
    }

    @PutMapping
    public ResponseEntity<Object> updatePersonalInfo(@PathVariable Long professorId, @RequestBody PersonalInfoRequest request) {
        LOG.info("API called to update personal info for professor with ID: {}", professorId);
        try {
            Object response = personalInfoBl.updatePersonalInfo(professorId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update personal info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            LOG.info("Operation completed successfully.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response instanceof UnsuccessfulResponse) {
            LOG.error("Operation failed.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else {
            LOG.error("Unknown response type.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

