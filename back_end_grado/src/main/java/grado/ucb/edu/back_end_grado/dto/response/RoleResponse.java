package grado.ucb.edu.back_end_grado.dto.response;

public class RoleResponse {
    private Long idRole;
    private String userRole;

    public RoleResponse(Long idRole, String userRole) {
        this.idRole = idRole;
        this.userRole = userRole;
    }

    // Getters and setters

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
