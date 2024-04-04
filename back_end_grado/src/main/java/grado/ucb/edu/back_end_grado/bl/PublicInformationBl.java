package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PublicInformationRequest;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Service
public class PublicInformationBl {
    private final PublicInformationDao publicInformationDao;
    private final UsersDao usersDao;
    private final RolesDao rolesDao;
    private final PersonDao personDao;
    private PublicInformationEntity publicInformationEntity;
    private PublicInformationResponse publicInformationResponse;

    public PublicInformationBl(PublicInformationDao publicInformationDao, UsersDao usersDao, RolesDao rolesDao, PersonDao personDao, PublicInformationEntity publicInformationEntity, PublicInformationResponse publicInformationResponse) {
        this.publicInformationDao = publicInformationDao;
        this.usersDao = usersDao;
        this.rolesDao = rolesDao;
        this.personDao = personDao;
        this.publicInformationEntity = publicInformationEntity;
        this.publicInformationResponse = publicInformationResponse;
    }

    // New public information
    public Object newPublicInformation(PublicInformationRequest request){
        publicInformationResponse = new PublicInformationResponse();
        try {
            // Checking if the user account tuple is active
            Optional<UsersEntity> users = usersDao.findByIdUsersAndStatus(request.getUsersIdUsers().getIdUsers(),1);
            if (users.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Cuenta no disponible");
            // Checking if the roles tuple is active and have the role of "CORDINADOR"
            Optional<RolesEntity> roles = rolesDao.findByIdRoleAndStatusAndUserRole(users.get().getRoleHasPersonEntity().getRolesIdRole().getIdRole(),1,"COORDINADOR");
            if (roles.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol de cuenta inadecuado");
            // Checking if the person is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(users.get().getPersonIdPerson().getIdPerson(),1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Persona no disponible");
            // Checking if the publication date and deadline are correct
            LocalDateTime publicationDate = LocalDateTime.parse(request.getPublicationDate().replace(" ", "T"));
            LocalDateTime deadLine = LocalDateTime.parse(request.getDeadline().replace(" ", "T"));
            LocalDateTime now = LocalDateTime.now();
            if (publicationDate.isAfter(deadLine) || deadLine.isBefore(publicationDate) || deadLine.isEqual(publicationDate) || publicationDate.isBefore(now)) return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1],"Error con fechas de publicación y plazo");
            // Preparing response
            request.setUsersIdUsers(users.get());
            publicInformationEntity = request.publicInformationRequestToEntity(request);
            publicInformationEntity = publicInformationDao.save(publicInformationEntity);
            publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1],publicInformationResponse);
    }

    // Get a list of all active public information considering the publication date and deadline
    public Object getAllActivePublicInformation(){
        //List<PublicInformationEntity> publicInformationEntityList = publicInformationDao.findByStatus(1);
        List<PublicInformationEntity> publicInformationEntityList = publicInformationDao.findActivePublicInformationWithinCurrentTime();
        List<PublicInformationResponse> response = new ArrayList<>();
        try {
            // Checking if there are retrieved information in the public information list
            if (publicInformationEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe información guardada aún");
            // Looping and filling response list with all the retrieved public information
            for (PublicInformationEntity x : publicInformationEntityList){
                response.add(new PublicInformationResponse().publicInformationEntityToResponse(x));
            }

        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],response);
    }

    // Get public information by its ID
    public Object getActivePublicInformationById(String idPublicInfo){
        publicInformationResponse = new PublicInformationResponse();
        try {
            Optional<PublicInformationEntity> publicInformation = publicInformationDao.findById(Long.parseLong(idPublicInfo));
            // Checking if the public information exists
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública no existe");
            publicInformation = publicInformationDao.findByIdPublicInfoAndStatus(Long.parseLong(idPublicInfo), 1);
            // Checking if the retrieved public information is active
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública inactiva");
            // Preparing response
            publicInformationEntity = publicInformation.get();
            publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],publicInformationResponse);
    }

    // Logic deleting a public information entry
    public Object deleteActivePublicInformationById(String idPublicInfo){
        publicInformationResponse = new PublicInformationResponse();
        try {
            Optional<PublicInformationEntity> publicInformation = publicInformationDao.findById(Long.parseLong(idPublicInfo));
            // Checking if the public information exists
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública no existe");
            publicInformation = publicInformationDao.findByIdPublicInfoAndStatus(Long.parseLong(idPublicInfo), 1);
            // Checking if the retrieved public information is already has been deleted
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública ya esta inactiva");
            // Locally deleting entry
            int x = publicInformationDao.logicDelete(Long.parseLong(idPublicInfo));
            // If there was an error deleting the entry
            if (x == 0) return new UnsuccessfulResponse(Globals.httpMethodNowAllowed[0], Globals.httpMethodNowAllowed[1], "Información pública ya esta inactiva");
            // Preparing response
            publicInformationEntity = publicInformation.get();
            publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],publicInformationResponse);
    }

    // Patch an active public information entry
    public Object patchActivePublicInformationById(PublicInformationRequest request){
        publicInformationResponse = new PublicInformationResponse();
        try {
            Optional<PublicInformationEntity> publicInformation = publicInformationDao.findById(request.getIdPublicInfo());
            // Checking if the public information exists
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública no existe");
            publicInformation = publicInformationDao.findByIdPublicInfoAndStatus(request.getIdPublicInfo(), 1);
            // Checking if the retrieved public information is already has been deleted
            if (publicInformation.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Información pública ya esta inactiva");
            // Patching the entry
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime publicationDate = LocalDateTime.parse(request.getPublicationDate(), formatter);
            LocalDateTime deadline = LocalDateTime.parse(request.getDeadline(), formatter);

            int x = publicInformationDao.patchEntry(request.getUsersIdUsers().getIdUsers(), request.getTitle(),request.getInformation(), request.getIdPublicInfo(), publicationDate, deadline);
            if (x == 0) return new UnsuccessfulResponse(Globals.httpMethodNowAllowed[0], Globals.httpMethodNowAllowed[1], "Problemas al modificar información pública");
            // Preparing response
            publicInformationEntity = publicInformationDao.findById(request.getIdPublicInfo()).get();
            //publicInformationEntity = publicInformation.get();
            publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);

        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],publicInformationResponse);
    }
}
