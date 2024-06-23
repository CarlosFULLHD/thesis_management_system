package grado.ucb.edu.back_end_grado.dto.response;

public class ActiveStudentResponse {
    private PersonResponse personResponse;
    private Long usersId;

    public ActiveStudentResponse(PersonResponse personResponse, Long usersId) {
        this.personResponse = personResponse;
        this.usersId = usersId;
    }

    public PersonResponse getPersonResponse() {
        return personResponse;
    }

    public void setPersonResponse(PersonResponse personResponse) {
        this.personResponse = personResponse;
    }

    public Long getUsersId() {
        return usersId;
    }

    public void setUsersId(Long usersId) {
        this.usersId = usersId;
    }
}
