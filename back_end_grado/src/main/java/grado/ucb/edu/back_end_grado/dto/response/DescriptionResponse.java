package grado.ucb.edu.back_end_grado.dto.response;

public class DescriptionResponse {
    private String description;

    public DescriptionResponse(String description) {
        this.description = description;
    }

    // Getter and Setter
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
