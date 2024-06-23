package grado.ucb.edu.back_end_grado.dto.request;

public class UpdateCommentsRequest {
    private String comments;

    // Constructor, getters y setters
    public UpdateCommentsRequest() {
    }

    public UpdateCommentsRequest(String comments) {
        this.comments = comments;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
