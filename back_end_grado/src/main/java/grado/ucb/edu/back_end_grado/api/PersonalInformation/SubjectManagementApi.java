package grado.ucb.edu.back_end_grado.api.PersonalInformation;

import grado.ucb.edu.back_end_grado.bl.SubjectManagementBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.SubjectUpdateRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Globals.apiVersion + "subjects/{userId}")
public class SubjectManagementApi {
    private final SubjectManagementBl subjectManagementBl;
    private static final Logger LOG = LoggerFactory.getLogger(SubjectManagementApi.class);

    public SubjectManagementApi(SubjectManagementBl subjectManagementBl) {
        this.subjectManagementBl = subjectManagementBl;
    }

    @PostMapping
    public ResponseEntity<Object> addSubjectToProfessor(@PathVariable Long userId, @RequestBody SubjectUpdateRequest request) {
        LOG.info("API called to add a new subject for professor with ID: {}", userId);
        try {
            Object response = subjectManagementBl.addSubjectToProfessor(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to add new subject", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    @PatchMapping("/{subjectId}")
    public ResponseEntity<Object> updateProfessorSubject(@PathVariable Long userId, @PathVariable Long subjectId, @RequestBody SubjectUpdateRequest request) {
        LOG.info("API called to update subject info for professor with ID: {}, subject ID: {}", userId, subjectId);
        try {
            Object response = subjectManagementBl.updateProfessorSubject(userId, subjectId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update subject info", e);
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
