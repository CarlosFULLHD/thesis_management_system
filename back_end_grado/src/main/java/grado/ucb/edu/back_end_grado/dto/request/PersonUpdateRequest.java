package grado.ucb.edu.back_end_grado.dto.request;

public class PersonUpdateRequest {
    private String description;
    private Integer status;

    // Getters y Setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
