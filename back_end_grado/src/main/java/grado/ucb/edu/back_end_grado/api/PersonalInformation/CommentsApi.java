//package grado.ucb.edu.back_end_grado.api.PersonalInformation;
//
//import grado.ucb.edu.back_end_grado.bl.CommentsBl;
//import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
//import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
//import grado.ucb.edu.back_end_grado.dto.request.CommentRequest;
//import grado.ucb.edu.back_end_grado.util.Globals;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping(Globals.apiVersion + "professor/{userId}/subjects/{subjectId}/comments")
//public class CommentsApi {
//    private final CommentsBl commentsBl;
//    private static final Logger LOG = LoggerFactory.getLogger(CommentsApi.class);
//
//    public CommentsApi(CommentsBl commentsBl) {
//        this.commentsBl = commentsBl;
//    }
//
//    @PostMapping
//    public ResponseEntity<Object> addComment(@PathVariable Long userId, @PathVariable Long subjectId, @RequestBody CommentRequest request) {
//        LOG.info("API called to add a new comment for professor ID: {}, subject ID: {}", userId, subjectId);
//        try {
//            Object response = commentsBl.addComment(userId, subjectId, request);
//            return generateResponse(response);
//        } catch (Exception e) {
//            LOG.error("Failed to add new comment", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
//        }
//    }
//
//    @PutMapping("/{commentId}")
//    public ResponseEntity<Object> updateComment(@PathVariable Long professorId, @PathVariable Long subjectId, @PathVariable Long commentId, @RequestBody CommentRequest request) {
//        LOG.info("API called to update comment for professor ID: {}, subject ID: {}, comment ID: {}", professorId, subjectId, commentId);
//        try {
//            Object response = commentsBl.updateComment(professorId, subjectId, commentId, request);
//            return generateResponse(response);
//        } catch (Exception e) {
//            LOG.error("Failed to update comment", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
//        }
//    }
//
//    @DeleteMapping("/{commentId}")
//    public ResponseEntity<Object> deleteComment(@PathVariable Long professorId, @PathVariable Long subjectId, @PathVariable Long commentId) {
//        LOG.info("API called to delete comment for professor ID: {}, subject ID: {}, comment ID: {}", professorId, subjectId, commentId);
//        try {
//            Object response = commentsBl.deleteComment(professorId, subjectId, commentId);
//            return generateResponse(response);
//        } catch (Exception e) {
//            LOG.error("Failed to delete comment", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
//        }
//    }
//
//    private ResponseEntity<Object> generateResponse(Object response) {
//        if (response instanceof SuccessfulResponse) {
//            LOG.info("Operation completed successfully.");
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } else if (response instanceof UnsuccessfulResponse) {
//            LOG.error("Operation failed.");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        } else {
//            LOG.error("Unknown response type.");
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}
