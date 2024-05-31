package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.dto.request.PersonUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class PersonBl {
    private final PersonDao personDao;
    private final UsersDao usersDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final RolesDao rolesDao;
    private final SocialNetworkDao socialNetworkDao;
    private PersonEntity personEntity;
    private PersonResponse personResponse;
    private static final Logger log = LoggerFactory.getLogger(PersonBl.class);
    @Autowired
    public PersonBl(PersonDao personDao, UsersDao usersDao, RoleHasPersonDao roleHasPersonDao, GradeProfileDao gradeProfileDao, RolesDao rolesDao, SocialNetworkDao socialNetworkDao, PersonEntity personEntity) {
        this.personDao = personDao;
        this.usersDao = usersDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.rolesDao = rolesDao;
        this.socialNetworkDao = socialNetworkDao;
        this.personEntity = personEntity;
    }


    @Transactional
    public Object updatePersonalInfo(Long userId, PersonUpdateRequest request) {
        try {
            UsersEntity user = usersDao.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

            PersonEntity person = user.getPersonIdPerson(); // Assuming there's a getPerson method in UsersEntity
            if (person == null) {
                throw new RuntimeException("No linked person record for user ID: " + userId);
            }

            // Update the person's details
            person.setCellPhone(request.getCellphone());
            person.setDescription(request.getDescription());
            personDao.save(person);

            log.info("Personal information updated successfully for user ID: {}", userId);
            return new SuccessfulResponse("202", "Personal information updated successfully", null);
        } catch (Exception e) {
            log.error("Error updating personal information for user ID: {}", userId, e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    // New person (Student) from initial form
    public Object newStudentFromInitialForm(PersonRequest request) {
        personResponse = new PersonResponse();
        try {
            // Checking if the student had used its institutional mail
            if (!request.getEmail().split("@")[1].equals("ucb.edu.bo"))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El estudiante no utiliza el correo institucional");
            // Checking if all the characters in the student CI are digits
            if (!request.getCi().chars().allMatch(Character::isDigit))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El CI del estudiante contiene caracteres prohibidos");
            // Checking if all the characters in the student phone are digits
            if (!request.getCellPhone().chars().allMatch(Character::isDigit))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El teléfono del estudiante contiene caracteres prohibidos");
            // Preparing response
            personEntity = request.personRequestToEntity(request);
            personEntity = personDao.save(personEntity);
            personResponse = personResponse.personEntityToResponse(personEntity);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], personResponse);
    }


    public Object getPersonById(Long id) {
        try {
            Optional<PersonEntity> personEntityOptional = personDao.findById(id);
            if (personEntityOptional.isPresent()) {
                PersonEntity personEntity = personEntityOptional.get();
                PersonResponse personResponse = new PersonResponse().personEntityToResponse(personEntity);
                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], personResponse);
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Estudiante no encontrado");
            }
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }


    public Object getAllPersonsBl() {
        try {
            List<PersonEntity> personEntities = personDao.findAll();
            List<PersonResponse> personResponses = personEntities.stream()
                    .map(new PersonResponse()::personEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], personResponses);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }





}