package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.RoleHasPersonRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.UsersResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersBl {
    private final UsersDao usersDao;
    private final RolesHasPersonBl rolesHasPersonBl;
    private final PersonDao personDao;
    private final RolesDao rolesDao;
    private UsersEntity usersEntity;
    private UsersResponse usersResponse;
    private RoleHasPersonRequest roleHasPersonRequest;

    public UsersBl(UsersDao usersDao, RolesHasPersonBl rolesHasPersonBl, PersonDao personDao, RolesDao rolesDao, UsersEntity usersEntity, UsersResponse usersResponse, RoleHasPersonRequest roleHasPersonRequest) {
        this.usersDao = usersDao;
        this.rolesHasPersonBl = rolesHasPersonBl;
        this.personDao = personDao;
        this.rolesDao = rolesDao;
        this.usersEntity = usersEntity;
        this.usersResponse = usersResponse;
        this.roleHasPersonRequest = roleHasPersonRequest;
    }

    // New account
    public Object newAccount(UsersRequest request, String roles){
        usersResponse = new UsersResponse();
        roleHasPersonRequest = new RoleHasPersonRequest();
        try {
            // Checking if the person tuple is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(request.getPersonIdPerson().getIdPerson(), 1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"La persona no se encuentra activa");
            // Checking if the role is active or not
            Optional<RolesEntity> role = rolesDao.findByUserRoleAndStatus(roles, 1);
            if (role.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol " + roles + " no se encuentra activo");
            // DB's entry for new account
            usersEntity = request.usersRequestToEntity(request);
            usersEntity.setPersonIdPerson(person.get());
            usersEntity = usersDao.save(usersEntity);
            // DB's entry for role_has_person with the role of a student
            roleHasPersonRequest.setUsersIdUsers(usersEntity);
            roleHasPersonRequest.setRolesIdRole(role.get());
            rolesHasPersonBl.newRoleToAnAccount(roleHasPersonRequest);
            // Preparing response
            usersResponse = usersResponse.usersEntityToResponse(usersEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], usersResponse);
    }



}
