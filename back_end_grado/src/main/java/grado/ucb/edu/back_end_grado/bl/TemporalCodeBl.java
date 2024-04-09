package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TemporalCodeRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.TemporalCodeResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TemporalCodeDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TemporalCodeBl {
    private final TemporalCodeDao temporalCodeDao;
    private final UsersDao usersDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final RolesDao rolesDao;
    private final EmailBl emailBl;
    private TemporalCodeEntity temporalCodeEntity;
    private TemporalCodeResponse temporalCodeResponse;

    public TemporalCodeBl(TemporalCodeDao temporalCodeDao, UsersDao usersDao, RoleHasPersonDao roleHasPersonDao, RolesDao rolesDao, EmailBl emailBl, TemporalCodeEntity temporalCodeEntity, TemporalCodeResponse temporalCodeResponse) {
        this.temporalCodeDao = temporalCodeDao;
        this.usersDao = usersDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.rolesDao = rolesDao;
        this.emailBl = emailBl;
        this.temporalCodeEntity = temporalCodeEntity;
        this.temporalCodeResponse = temporalCodeResponse;
    }

    // New temporal code
    public Object newTemporalCode(UsersRequest usersRequest){
        temporalCodeResponse = new TemporalCodeResponse();
        try {
            // Checking if the account that is creating the code is active
            Optional<UsersEntity> user = usersDao.findByIdUsersAndStatus(usersRequest.getIdUsers(), 1);
            System.out.println("ANTES SISISIS");
            if (user.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"La cuenta no se encuentra activa");
            Optional<RoleHasPersonEntity> roleHasPerson = roleHasPersonDao.findByIdRolePerAndStatus(user.get().getRoleHasPersonEntity().getIdRolePer(),1);
            if (roleHasPerson.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"El rol de la cuenta no se encuentra activa");
            // Checking if the role of the account is the appropriate one
            Optional<RolesEntity> roles = rolesDao.findByIdRoleAndStatusAndUserRole(roleHasPerson.get().getRolesIdRole().getIdRole(),1,"COORDINADOR");
            if(roles.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"El rol de la cuenta es el inadecuado");
            // Generating code in DB's
            temporalCodeEntity = new TemporalCodeEntity();
            temporalCodeEntity.setSendItTo(usersRequest.getUsername());
            temporalCodeEntity = temporalCodeDao.save(temporalCodeEntity);
            // Sending email to the person with temporal code
            String htmlBody = newAccountHtmlBodyEmail(temporalCodeEntity.getTemporalCode());
            emailBl.sendNewAccountData(usersRequest.getUsername(),"Código temporal - sistema taller de grado", htmlBody);
            temporalCodeResponse = temporalCodeResponse.temporalCodeEntityToResponse(temporalCodeEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], temporalCodeResponse);
    }

    // Check if temporal code is correct
    public Object getActiveTemporalCode(TemporalCodeRequest temporalCodeRequest){
        temporalCodeResponse = new TemporalCodeResponse();
        try {
            // Checking if the temporal code exists
            //Optional<TemporalCodeEntity> temporalCode = temporalCodeDao.findByTemporalCodeAndIsUsed(temporalCodeRequest.getTemporalCode(),0);
            Optional<TemporalCodeEntity> temporalCode = temporalCodeDao.findByTemporalCode(temporalCodeRequest.getTemporalCode());
            if (temporalCode.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Código temporal inexistente");
            // Checking if the temporal code has been used or not
            if (temporalCode.get().getIsUsed() == 1) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Código temporal ya utilizado");
            // Checking if the time in what im trying to use the code is correct
            LocalDateTime deadLine = temporalCode.get().getDueDate();
            LocalDateTime now = LocalDateTime.now();
            if (!now.isBefore(deadLine)) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Tiempo de uso inadecuado");
            System.out.println("ANTES");

            // Changing state to used
            temporalCodeDao.patchEntry(temporalCode.get().getIdTemporal());
            temporalCode.get().setIsUsed(1);
            System.out.println("DESPUES");
            // Preparing response
            temporalCodeResponse = temporalCodeResponse.temporalCodeEntityToResponse(temporalCode.get());
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], temporalCodeResponse);
    }

    // Method to create the body for a new email temporal code
    public String newAccountHtmlBodyEmail(String temporalCode){
        return "<html>"
                + "<body>"
                + "<h1>Código temporal - sistema de taller de grado</h1>"
                + "<h2>Para crear una cuenta de docente</h2>"
                + "<p><b>Ingresa el código temporal: </b>" + temporalCode +" </p>"
                + "<p><b>En la siguiente URL: </b> http://localhost:3000/CodigoTemporal</p>"
                + "<h2>Recuerda que el código solo dura 24 horas</h2>"
                + "</body>"
                + "</html>";
    }
}
