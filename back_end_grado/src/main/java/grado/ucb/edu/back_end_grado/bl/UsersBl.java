package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.EditUserByIdRequest;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.request.RoleHasPersonRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.RoleHasPersonResponse;
import grado.ucb.edu.back_end_grado.dto.response.UsersResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import grado.ucb.edu.back_end_grado.dto.response.ListUsersResponse;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import grado.ucb.edu.back_end_grado.dto.response.GetUserByIdResponse;
@Service
public class UsersBl {
    private final UsersDao usersDao;
    private final RolesHasPersonBl rolesHasPersonBl;
    private final MilestoneBl milestoneBl;
    private final GradeProfileBl gradeProfileBl;

    private final PersonDao personDao;
    private final RolesDao rolesDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private UsersEntity usersEntity;
    private UsersResponse usersResponse;
    private EmailBl emailBl;
    private RoleHasPersonRequest roleHasPersonRequest;
    private PasswordEncoder passwordEncoder;

    private AcademicPeriodDao academicPeriodDao;
    private static final Logger LOG = LoggerFactory.getLogger(UsersBl.class);


    public UsersBl(UsersDao usersDao, RolesHasPersonBl rolesHasPersonBl, MilestoneBl milestoneBl, GradeProfileBl gradeProfileBl, PersonDao personDao, RolesDao rolesDao, UsersEntity usersEntity, UsersResponse usersResponse, EmailBl emailBl, RoleHasPersonRequest roleHasPersonRequest, PasswordEncoder passwordEncoder, AcademicPeriodDao academicPeriodDao, RoleHasPersonDao roleHasPersonDao) {
        this.usersDao = usersDao;
        this.rolesHasPersonBl = rolesHasPersonBl;
        this.milestoneBl = milestoneBl;
        this.gradeProfileBl = gradeProfileBl;
        this.personDao = personDao;
        this.rolesDao = rolesDao;
        this.usersEntity = usersEntity;
        this.usersResponse = usersResponse;
        this.emailBl = emailBl;
        this.roleHasPersonRequest = roleHasPersonRequest;
        this.passwordEncoder = passwordEncoder;
        this.academicPeriodDao = academicPeriodDao;
        this.roleHasPersonDao = roleHasPersonDao;
    }
    public Object listUsers(Pageable pageable, String filter) {
        try {
            Page<UsersEntity> usersPage;
            if (filter != null && !filter.isEmpty()) {
                usersPage = usersDao.findFilteredUsers(filter, 1, pageable);
            } else {
                usersPage = usersDao.findAllUsers(1, pageable);
            }

            List<ListUsersResponse> usersResponses = usersPage.stream()
                    .map(user -> new ListUsersResponse(
                            user.getIdUsers(),
                            user.getUsername(),
                            user.getPersonIdPerson().getName(),
                            user.getPersonIdPerson().getFatherLastName(),
                            user.getPersonIdPerson().getMotherLastName(),
                            user.getRoleHasPersonEntity().getRolesIdRole().getUserRole()
                    ))
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("data", usersResponses);
            response.put("totalPages", usersPage.getTotalPages());
            response.put("totalItems", usersPage.getTotalElements());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
        } catch (Exception e) {
            LOG.error("Error al listar usuarios", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object getUserDetailsById(Long userId) {
        try {
            Optional<UsersEntity> usersEntityOptional = usersDao.findById(userId);
            if (usersEntityOptional.isPresent()) {
                UsersEntity usersEntity = usersEntityOptional.get();
                GetUserByIdResponse response = new GetUserByIdResponse(
                        usersEntity.getIdUsers(),
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getCi() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getName() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getFatherLastName() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getMotherLastName() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getDescription() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getEmail() : null,
                        usersEntity.getPersonIdPerson() != null ? usersEntity.getPersonIdPerson().getCellPhone() : null,
                        usersEntity.getStatus(),
                        usersEntity.getCreatedAt() != null ? usersEntity.getCreatedAt().toString() : null,
                        usersEntity.getRoleHasPersonEntity() != null && usersEntity.getRoleHasPersonEntity().getRolesIdRole() != null ? usersEntity.getRoleHasPersonEntity().getRolesIdRole().getUserRole() : null
                );
                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Usuario no encontrado");
            }
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }


    public Object editUserById(Long userId, EditUserByIdRequest request) {
        try {
            Optional<UsersEntity> usersEntityOptional = usersDao.findById(userId);
            if (usersEntityOptional.isPresent()) {
                UsersEntity usersEntity = usersEntityOptional.get();

                // Update PersonEntity
                PersonEntity personEntity = usersEntity.getPersonIdPerson();
                if (personEntity == null) {
                    personEntity = new PersonEntity();
                    usersEntity.setPersonIdPerson(personEntity);
                }
                personEntity.setCi(request.getCi());
                personEntity.setName(request.getName());
                personEntity.setFatherLastName(request.getFatherLastName());
                personEntity.setMotherLastName(request.getMotherLastName());
                personEntity.setDescription(request.getDescription());
                personEntity.setEmail(request.getEmail());
                personEntity.setCellPhone(request.getCellPhone());
                personDao.save(personEntity);

                // Update UsersEntity
                usersEntity.setStatus(request.getStatus());
                usersDao.save(usersEntity);

                // Update Role
                RoleHasPersonEntity roleHasPersonEntity = usersEntity.getRoleHasPersonEntity();
                if (roleHasPersonEntity == null) {
                    roleHasPersonEntity = new RoleHasPersonEntity();
                    roleHasPersonEntity.setUsersIdUsers(usersEntity);
                }
                Optional<RolesEntity> rolesEntityOptional = rolesDao.findById(request.getIdRole());
                if (rolesEntityOptional.isPresent()) {
                    roleHasPersonEntity.setRolesIdRole(rolesEntityOptional.get());
                    roleHasPersonDao.save(roleHasPersonEntity);
                } else {
                    return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "Rol no encontrado");
                }

                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Usuario actualizado exitosamente");
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Usuario no encontrado");
            }
        } catch (Exception e) {
            LOG.error("Error al actualizar el usuario por ID", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object deleteUserById(Long userId) {
        try {
            Optional<UsersEntity> usersEntityOptional = usersDao.findById(userId);
            if (usersEntityOptional.isPresent()) {
                UsersEntity usersEntity = usersEntityOptional.get();

                // Eliminar la relación RoleHasPersonEntity
                RoleHasPersonEntity roleHasPersonEntity = usersEntity.getRoleHasPersonEntity();
                if (roleHasPersonEntity != null) {
                    roleHasPersonDao.delete(roleHasPersonEntity);
                }

                // Eliminar el usuario (esto eliminará en cascada las entidades relacionadas excepto el rol)
                usersDao.delete(usersEntity);

                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Usuario eliminado exitosamente");
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Usuario no encontrado");
            }
        } catch (Exception e) {
            LOG.error("Error al eliminar el usuario por ID", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
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
            // Checking if there is an academic period right now
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
            if (academicPeriod.isEmpty()){
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para la inscripción");
            }
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
            // If the role assigned is not created successfully
            if (roleHasPerson instanceof UnsuccessfulResponse) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al asignar un rol para la cuenta");
            // Creating a new milestone for the new user
            Object milestone = milestoneBl.newMilestone(usersEntity);
            // If the milestone is not created properly
            if (milestone instanceof UnsuccessfulResponse) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al asignar hito a nueva cuenta");




//            // Creating a new grade profile
//            Object gradeProfile = gradeProfileBl.newGradeProfileForNewStudentAccount(((RoleHasPersonResponse) ((SuccessfulResponse) roleHasPerson).getResult()).getIdRolePer());
//            // If the created grade profile has failed
//            if (gradeProfile instanceof UnsuccessfulResponse) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al crear un perfil de grado para la cuenta de estudiante");
//            Object programmedTasksGradeProfile = gradeProfileHasTaskBl.addAllDefaultTasksToANewGradeProfile(((GradeProfileResponse) ((SuccessfulResponse) gradeProfile).getResult()).getIdGradePro(), academicPeriod.get().getIdAcad());




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
