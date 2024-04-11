package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.request.RoleHasPersonRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.RoleHasPersonResponse;
import grado.ucb.edu.back_end_grado.dto.response.UsersResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;
import java.util.Random;

@Service
public class UsersBl {
    private final UsersDao usersDao;
    private final RolesHasPersonBl rolesHasPersonBl;
    private final GradeProfileBl gradeProfileBl;
    private final GradeProfileHasTaskBl gradeProfileHasTaskBl;
    private final PersonDao personDao;
    private final RolesDao rolesDao;
    private UsersEntity usersEntity;
    private UsersResponse usersResponse;
    private EmailBl emailBl;
    private RoleHasPersonRequest roleHasPersonRequest;
    private PasswordEncoder passwordEncoder;

    public UsersBl(UsersDao usersDao, RolesHasPersonBl rolesHasPersonBl, GradeProfileBl gradeProfileBl, GradeProfileHasTaskBl gradeProfileHasTaskBl, PersonDao personDao, RolesDao rolesDao, UsersEntity usersEntity, UsersResponse usersResponse, EmailBl emailBl, RoleHasPersonRequest roleHasPersonRequest, PasswordEncoder passwordEncoder) {
        this.usersDao = usersDao;
        this.rolesHasPersonBl = rolesHasPersonBl;
        this.gradeProfileBl = gradeProfileBl;
        this.gradeProfileHasTaskBl = gradeProfileHasTaskBl;
        this.personDao = personDao;
        this.rolesDao = rolesDao;
        this.usersEntity = usersEntity;
        this.usersResponse = usersResponse;
        this.emailBl = emailBl;
        this.roleHasPersonRequest = roleHasPersonRequest;
        this.passwordEncoder = passwordEncoder;
    }

    // New account
    @Transactional
    public Object newAccount(UsersRequest request, String roles){
        usersResponse = new UsersResponse();
        try {
            // Checking if the person tuple is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(request.getPersonIdPerson().getIdPerson(), 1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"La persona no se encuentra activa");
            // Checking if the role is active or not
            Optional<RolesEntity> role = rolesDao.findByUserRoleAndStatus(roles, 1);
            if (role.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol " + roles + " no se encuentra activo");
            // Generating random passwords
            String generatedPwd = randomAlphaNumericString(12);
            String generatedSalt = randomAlphaNumericString(24);
            // DB's entry for new account
            usersEntity = request.usersRequestToEntity(request);
            usersEntity.setPersonIdPerson(person.get());
            usersEntity.setUsername(person.get().getEmail());
            usersEntity.setPassword(passwordEncoder.encode(generatedPwd+generatedSalt));
            usersEntity.setSalt(generatedSalt);
            usersEntity.setStatus(-1);
            usersEntity = usersDao.save(usersEntity);
            // DB's entry for role_has_person with the role of a student
            roleHasPersonRequest = new RoleHasPersonRequest();
            roleHasPersonRequest.setUsersIdUsers(usersEntity);
            roleHasPersonRequest.setRolesIdRole(role.get());
            Object roleHasPerson = rolesHasPersonBl.newRoleToAnAccount(roleHasPersonRequest);
            if (roleHasPerson instanceof UnsuccessfulResponse) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al asignar un rol para la cuenta");
            // Creating a new grade profile with all initial tasks if the user is a student
            if (roles.equals("ESTUDIANTE") && roleHasPerson instanceof SuccessfulResponse && ((SuccessfulResponse) roleHasPerson).getResult() instanceof RoleHasPersonResponse){
                Object gradeProfile = gradeProfileBl.newGradeProfileForNewStudentAccount(((RoleHasPersonResponse) ((SuccessfulResponse) roleHasPerson).getResult()).getIdRolePer());
                if (gradeProfile instanceof UnsuccessfulResponse) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al crear un perfil de grado para la cuenta de estudiante");
                if (gradeProfile instanceof SuccessfulResponse && ((SuccessfulResponse) gradeProfile).getResult() instanceof GradeProfileResponse){
                    gradeProfileHasTaskBl.addAllDefaultTasksToANewGradeProfile(((GradeProfileResponse) ((SuccessfulResponse) gradeProfile).getResult()).getIdGradePro());
                }
            }
            // Sending email to the person with account data
            String htmlBody = newAccountHtmlBodyEmail(usersEntity.getUsername(), generatedPwd, roles);
            emailBl.sendNewAccountData(usersEntity.getPersonIdPerson().getEmail(),"Nueva cuenta - sistema taller de grado", htmlBody);
            // Preparing response
            usersResponse = usersResponse.usersEntityToResponse(usersEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], usersResponse);
    }
    public Object createAccount(UsersRequest request, String roles){
        try {
            // Checking if the person tuple is active
            Optional<PersonEntity> person = personDao.findByIdPersonAndStatus(request.getPersonIdPerson().getIdPerson(), 1);
            if (person.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"La persona no se encuentra activa");
            // Checking if the role is active or not
            Optional<RolesEntity> role = rolesDao.findByUserRoleAndStatus(roles, 1);
            if (role.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol " + roles + " no se encuentra activo");
            // Generating random passwords
            String generatedPwd = randomAlphaNumericString(12);
            String generatedSalt = randomAlphaNumericString(24);

            // DB's entry for new account
            usersEntity = request.usersRequestToEntity(request);
            usersEntity.setPersonIdPerson(person.get());
            usersEntity.setUsername(person.get().getEmail());
            usersEntity.setPassword(passwordEncoder.encode(generatedPwd));
            usersEntity.setSalt(generatedSalt);
            usersEntity.setStatus(1); // Indica que es necesario cambiar la contraseña - 1

            usersEntity = usersDao.save(usersEntity);
            // DB's entry for role_has_person with the role of a student
            RoleHasPersonRequest roleRequest = new RoleHasPersonRequest();
            roleRequest.setUsersIdUsers(usersEntity);
            roleRequest.setRolesIdRole(role.get());
            Object roleAssignmentResponse = rolesHasPersonBl.newRoleToAnAccount(roleRequest);
            if (roleAssignmentResponse instanceof UnsuccessfulResponse) {
                return roleAssignmentResponse; // Manejo de error en la asignación del rol
            }
            // Sending email to the person with account data
            String htmlBody = newAccountHtmlBodyEmail(usersEntity.getUsername(), generatedPwd, roles);
            emailBl.sendNewAccountData(usersEntity.getPersonIdPerson().getEmail(),"Bienvenido Docente al sistema taller de grado", htmlBody);
            // Preparing response
            usersResponse = new UsersResponse();
            usersResponse = usersResponse.usersEntityToResponse(usersEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], usersResponse);
    }

    // Method to generate new random string
    public String randomAlphaNumericString(int length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = length;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return generatedString;
    }

    // Method to create the body for a new email account
    public String newAccountHtmlBodyEmail(String username, String password, String rol){
        return "<html>"
                + "<body>"
                + "<h1>Nueva cuenta - sistema de taller de grado</h1>"
                + "<h2>¡Tu cuenta de " + rol +" fue creada exitosamente!</h2>"
                + "<p><b>CUENTA: </b>"+ username + "</p>"
                + "<p><b>CONTRASEÑA: </b>"+ password + "</p>"
                + "<h2>Recuerda cambiar tu contraseña luego de conectarte</h2>"
                + "</body>"
                + "</html>";
    }
}
