package grado.ucb.edu.back_end_grado.dto.request;

public class PersonUpdateRequest {
    private String cellphone;
    private String description;


    // Constructors, getters and setters
    public PersonUpdateRequest() {}

    public PersonUpdateRequest(String cellphone, String description) {
        this.cellphone = cellphone;
        this.description = description;

    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
