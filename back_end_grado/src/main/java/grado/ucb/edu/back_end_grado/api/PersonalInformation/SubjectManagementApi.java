package grado.ucb.edu.back_end_grado.api.PersonalInformation;

import grado.ucb.edu.back_end_grado.bl.SubjectManagementBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.SubjectUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.request.UpdateCommentsRequest;
import grado.ucb.edu.back_end_grado.dto.response.SubjectsResponse;
import grado.ucb.edu.back_end_grado.dto.response.UserSubjectsResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Globals.apiVersion + "subjects")
@Tag(name = "API - Subject Management", description = "Endpoint for managing subjects within the system")
public class SubjectManagementApi {
    private final SubjectManagementBl subjectManagementBl;
    private static final Logger LOG = LoggerFactory.getLogger(SubjectManagementApi.class);

    public SubjectManagementApi(SubjectManagementBl subjectManagementBl) {
        this.subjectManagementBl = subjectManagementBl;
    }

    @Operation(
            summary = "Create and link a new subject",
            description = "Creates a new subject and links it to a professor by their user ID")
    @PostMapping("/{userId}/new")
    public ResponseEntity<Object> createAndLinkSubject(@PathVariable Long userId, @RequestBody SubjectUpdateRequest request) {
        LOG.info("API called to create a new subject and link to professor with ID: {}", userId);
        try {
            Object response = subjectManagementBl.createAndLinkSubject(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to create and link new subject", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Link an existing subject to a professor",
            description = "Links an existing subject to a professor and allows them to add comments")
    @PostMapping("/{userId}/choose")
    public ResponseEntity<Object> addSubjectToProfessor(@PathVariable Long userId, @RequestBody SubjectUpdateRequest request) {
        LOG.info("API called to link existing subject for professor with ID: {}", userId);
        try {
            Object response = subjectManagementBl.addSubjectToProfessor(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to link subject", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }
    @Operation(
            summary = "Deactivate a subject related to a docente",
            description = "Deactivate the subject related and change the status from 1 to (0)")
    @PatchMapping("/{userId}/{subjectId}/deactivate")
    public ResponseEntity<Object> deactivateSubjectForProfessor(@PathVariable Long userId, @PathVariable Long subjectId) {
        LOG.info("API called to deactivate subject ID: {} for professor with ID: {}", subjectId, userId);
        try {
            Object response = subjectManagementBl.deactivateSubjectForProfessor(userId, subjectId);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to deactivate subject", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }





    @Operation(
            summary = "Update subject information",
            description = "Updates subject information for a given professor and subject ID")
    @PatchMapping("/{userId}/{subjectId}")
    public ResponseEntity<Object> updateProfessorSubject(@PathVariable Long userId, @PathVariable Long subjectId, @RequestBody SubjectUpdateRequest request) {
        LOG.info("API called to update subject info for professor with ID: {}, subject ID: {}", userId, subjectId);
        try {
            Object response = subjectManagementBl.updateProfessorSubject(userId, subjectId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update subject info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }



    @Operation(
            summary = "List all subjects",
            description = "Lists all active subjects available in the system")
    @GetMapping
    public ResponseEntity<Object> listSubjects() {
//        LOG.info("Request received to list all subjects");
        try {
            List<SubjectsResponse> subjects = subjectManagementBl.listActiveSubjects();
//            LOG.info("Retrieved {} subjects successfully.", subjects.size());
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
//            LOG.error("Failed to list subjects due to an exception: {}", e.getMessage(), e);
            UnsuccessfulResponse errorResponse = new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @Operation(
            summary = "Get all subjects and comments for a user",
            description = "Obtains all subjects and related comments for a user by their ID")
    @GetMapping("/users-information/{userId}")
    public ResponseEntity<Object> getUserSubjectsAndComments(@PathVariable Long userId) {
        LOG.info("API called to get all subjects and comments for user with ID: {}", userId);
        try {
            List<UserSubjectsResponse> response = subjectManagementBl.getUserSubjectsAndComments(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOG.error("Failed to get subjects and comments for user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Update comments for a subject related to a professor",
            description = "Updates the comments for a specific subject related to a professor by user ID and subject ID")
    @PatchMapping("/{userId}/{subjectId}/comments")
    public ResponseEntity<Object> updateComments(@PathVariable Long userId, @PathVariable Long subjectId, @RequestBody UpdateCommentsRequest request) {
        LOG.info("API called to update comments for subject ID: {} and user ID: {}", subjectId, userId);
        try {
            Object response = subjectManagementBl.updateComments(userId, subjectId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update comments", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }




    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            LOG.info("Operation completed successfully.");
            return ResponseEntity.ok(response);
        } else if (response instanceof UnsuccessfulResponse) {
            LOG.error("Operation failed.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            LOG.error("Unknown response type.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
