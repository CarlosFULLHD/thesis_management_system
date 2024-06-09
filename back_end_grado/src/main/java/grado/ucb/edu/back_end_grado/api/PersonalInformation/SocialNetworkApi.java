package grado.ucb.edu.back_end_grado.api.PersonalInformation;

import grado.ucb.edu.back_end_grado.bl.SocialNetworkBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.SocialNetworkUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.request.SocialNetworkCreateRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Globals.apiVersion + "professor/{userId}/social-networks")
public class SocialNetworkApi {
    private final SocialNetworkBl socialNetworkBl;
    private static final Logger LOG = LoggerFactory.getLogger(SocialNetworkApi.class);

    public SocialNetworkApi(SocialNetworkBl socialNetworkBl) {
        this.socialNetworkBl = socialNetworkBl;
    }

    @Operation(
            summary = "Update social network info",
            description = "Updates the social network information for a specific professor by user ID and social network ID"
    )
    @PatchMapping("/{socialNetworkId}")
    public ResponseEntity<Object> updateSocialNetworkInfo(@PathVariable Long userId, @PathVariable Long socialNetworkId, @RequestBody SocialNetworkUpdateRequest request) {
        LOG.info("API called to update social network info for professor with ID: {}", userId);
        try {
            Object response = socialNetworkBl.updateSocialNetworkInfo(userId, socialNetworkId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update social network info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Create social network info",
            description = "Creates social network information for a specific professor by user ID"
    )
    @PostMapping
    public ResponseEntity<Object> createSocialNetworkInfo(@PathVariable Long userId, @RequestBody SocialNetworkCreateRequest request) {
        LOG.info("API called to create social network info for professor with ID: {}", userId);
        try {
            Object response = socialNetworkBl.createSocialNetworkInfo(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to create social network info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Delete social network info",
            description = "Deletes social network information for a specific professor by user ID and social network ID"
    )
    @DeleteMapping("/{socialNetworkId}")
    public ResponseEntity<Object> deleteSocialNetworkInfo(@PathVariable Long userId, @PathVariable Long socialNetworkId) {
        LOG.info("API called to delete social network info for professor with ID: {}", userId);
        try {
            Object response = socialNetworkBl.deleteSocialNetworkInfo(userId, socialNetworkId);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to delete social network info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }
    @Operation(
            summary = "Get all social networks for a user",
            description = "Obtains all social networks for a user by their user ID")
    @GetMapping
    public ResponseEntity<Object> getAllSocialNetworks(@PathVariable Long userId) {
        LOG.info("API called to get all social networks for professor with ID: {}", userId);
        try {
            Object response = socialNetworkBl.getAllSocialNetworks(userId);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to get social networks", e);
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
