package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PublicInformationRequest;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.PublicInformationDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PublicInformationBl {
    private final PublicInformationDao publicInformationDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final RolesDao rolesDao;
    private final PersonDao personDao;
    private PublicInformationEntity publicInformationEntity;
    private PublicInformationResponse publicInformationResponse;

    public PublicInformationBl(PublicInformationDao publicInformationDao, RoleHasPersonDao roleHasPersonDao, RolesDao rolesDao, PersonDao personDao, PublicInformationEntity publicInformationEntity, PublicInformationResponse publicInformationResponse) {
        this.publicInformationDao = publicInformationDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.rolesDao = rolesDao;
        this.personDao = personDao;
        this.publicInformationEntity = publicInformationEntity;
        this.publicInformationResponse = publicInformationResponse;
    }

    // New public information
    public Object newPublicInformation(PublicInformationRequest request){
        publicInformationResponse = new PublicInformationResponse();
        try {
            // Checking if the role_has_person tuple is active
            Optional<RoleHasPersonEntity> roleHasPerson = roleHasPersonDao.findByIdRolePerAndStatus(request.getRoleHasPersonIdRolePer().getIdRolePer(), 1);
            if (roleHasPerson.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol asignado a persona no existe");
            // Checking if the roles tuple is active
            Optional<RolesEntity> roles = rolesDao.findByIdRoleAndStatus(roleHasPerson.get().getRolesIdRole().getIdRole(), 1);
            if (roles.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol no existe");
            // Checking if the role of the user is "CORDINADOR"
            Optional<RolesEntity> rolesCordinator = rolesDao.findByIdRoleAndUserRole(roleHasPerson.get().getRolesIdRole().getIdRole(), "COORDINADOR");
            if (rolesCordinator.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol no adecuado");
            // Checking if the person is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(roleHasPerson.get().getPersonIdPerson().getIdPerson(), 1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Persona no existe");
            request.setRoleHasPersonIdRolePer(roleHasPerson.get());
            publicInformationEntity = request.publicInformationRequestToEntity(request);
            publicInformationEntity = publicInformationDao.save(publicInformationEntity);
            publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1],publicInformationResponse);
    }

    // Get a list of all active public information
    public Object getAllActivePublicInformation(){
        List<PublicInformationEntity> publicInformationEntityList = publicInformationDao.findByStatus(1);
        List<PublicInformationResponse> response = new ArrayList<>();
        try {
            if (publicInformationEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe información guardada aún");

            for (PublicInformationEntity x : publicInformationEntityList){
                response.add(new PublicInformationResponse().publicInformationEntityToResponse(x));
            }

        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1],response);
    }


}
