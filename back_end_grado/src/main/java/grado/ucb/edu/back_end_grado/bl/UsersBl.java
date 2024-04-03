package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.UsersResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersBl {
    private final UsersDao usersDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final PersonDao personDao;
    private UsersEntity usersEntity;
    private UsersResponse usersResponse;

    public UsersBl(UsersDao usersDao, RoleHasPersonDao roleHasPersonDao, PersonDao personDao, UsersEntity usersEntity, UsersResponse usersResponse) {
        this.usersDao = usersDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.personDao = personDao;
        this.usersEntity = usersEntity;
        this.usersResponse = usersResponse;
    }

    // New user account
    public Object newUsersAccount(UsersRequest request){
        usersResponse = new UsersResponse();
        try {
            // Checking if the role_has_person tuple is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(request.getPersonIdPerson().getIdPerson(), 1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"La persona no se encuentra activa");
            // DB's entry
            usersEntity = request.usersRequestToEntity(request);
            usersEntity = usersDao.save(usersEntity);
            // Preparing response
            usersResponse = usersResponse.usersEntityToResponse(usersEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], usersResponse);
    }
}
