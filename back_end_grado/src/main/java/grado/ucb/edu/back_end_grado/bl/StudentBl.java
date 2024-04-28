package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.response.ActiveStudentResponse;
import grado.ucb.edu.back_end_grado.dto.response.DescriptionResponse;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.dto.response.StudentDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import java.util.stream.Collectors;

@Service
public class StudentBl {
    private final PersonDao personDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final RolesDao rolesDao;
    private final UsersDao usersDao;

    private static final Logger log = LoggerFactory.getLogger(StudentBl.class);

    @Autowired
    public StudentBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao,
                     GradeProfileDao gradeProfileDao,
                     RolesDao rolesDao, UsersDao usersDao) {
        this.personDao = personDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.rolesDao = rolesDao;
        this.usersDao = usersDao;
    }

    private static final int status = 1;
    private static final int WAITING_FOR_APPROVAL_STATUS_DRIVE = 0;

    public Object updateDescription(Long id, String description) {
        try {
            Optional<PersonEntity> personOptional = personDao.findById(id);
            if (personOptional.isEmpty()) {
                return new UnsuccessfulResponse("404", "Persona no encontrada", null);
            }

            PersonEntity person = personOptional.get();
            person.setDescription(description);
            personDao.save(person);

            DescriptionResponse descriptionResponse = new DescriptionResponse(description);
            return new SuccessfulResponse("200", "Descripción actualizada con éxito", descriptionResponse);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Error interno del servidor", e.getMessage());
        }
    }

    public Object getAllStudentsWaitingForApproval(Pageable pageable, String filter) {
        try {
            List<PersonEntity> personsWithoutUsers;
            if (filter == null || filter.isEmpty()) {
                // No filter provided, use existing logic
                personsWithoutUsers = personDao.getPersonWithoutUser(status, pageable);
            } else {
                // Implement filtering logic here
                personsWithoutUsers = personDao.findFilteredPersons(filter, status, pageable);
            }

            // Convert to DTOs
            List<StudentDetailsResponse> waitingStudentsResponse = personsWithoutUsers.stream()
                    .map(person -> new StudentDetailsResponse(
                            person.getIdPerson(),
                            person.getCi(),
                            person.getName(),
                            person.getFatherLastName(),
                            person.getMotherLastName(),
                            person.getDescription(),
                            person.getEmail(),
                            person.getCellPhone(),
                            person.getCreatedAt())
                    )
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], waitingStudentsResponse);
        } catch (Exception e) {
            log.error("Error al obtener estudiantes esperando aprobación", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object getActiveStudents(Pageable pageable, int status, String filter) {

        if (filter != null && filter.trim().isEmpty()) {
            filter = null; // Normalize empty string to null
        }
        // Encuentra todas las entidades personas que tienen el rol de estudiante
        List<PersonEntity> activeStudents = personDao.findFilteredActiveStudents(filter, status, pageable);

        // Mapea la lista de personas
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<ActiveStudentResponse> respose = activeStudents.stream()
                .map(person -> {
                    PersonResponse personResponse = new PersonResponse();

                    personResponse.setIdPerson(person.getIdPerson());
                    personResponse.setCi(person.getCi());
                    personResponse.setName(person.getName());
                    personResponse.setFatherLastName(person.getFatherLastName());
                    personResponse.setMotherLastName(person.getMotherLastName());
                    personResponse.setDescription(person.getDescription());
                    personResponse.setEmail(person.getEmail());
                    personResponse.setCellPhone(person.getCellPhone());
                    personResponse.setStatus(person.getStatus());

                    if (person.getCreatedAt() != null) {
                        personResponse.setCreatedAt(person.getCreatedAt().format(formatter));
                    }

                    Long usersId = null;
                    if (person.getUsersEntity() != null) {
                        usersId = person.getUsersEntity().getIdUsers();
                    }

                    return new ActiveStudentResponse(personResponse, usersId);
                })
                .collect(Collectors.toList());
        // Devuelve las entidades Person correspondientes a esos usuarios activos
        
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], respose);
    }

    // Método para crear un registro completo de un estudiante
    @Transactional
    public Object registerStudent(CompleteStudentRegistrationRequest request) {
        try {
            log.info("Registrando un nuevo estudiante con CI: {}", request.getCi());
            // Validaciones
            if (!request.getEmail().split("@")[1].equals("ucb.edu.bo")) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El estudiante no utiliza el correo institucional");
            }
            if (!request.getCi().chars().allMatch(Character::isDigit)) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El CI del estudiante contiene caracteres no permitidos");
            }
            if (!request.getCellPhone().chars().allMatch(Character::isDigit)) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El teléfono del estudiante contiene caracteres no permitidos");
            }

            // Crear y guardar la entidad Person
            PersonEntity person = new PersonEntity();
            person.setCi(request.getCi());
            person.setName(request.getName());
            person.setFatherLastName(request.getFatherLastName());
            person.setMotherLastName(request.getMotherLastName());
            person.setDescription("Estudiante UCB La Paz");
            person.setEmail(request.getEmail());
            person.setCellPhone(request.getCellPhone());
            person.setStatus(1); // Activo
            person.setImageUrl("sin_imagen");
            personDao.save(person);
            log.info("Estudiante registrado con éxito con ID: {}", person.getIdPerson());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], person);
        } catch (Exception e) {
            log.error("Error al registrar estudiante", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }


    public void deleteStudentById(Long id) {
        PersonEntity student = personDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Estudiante no encontrado con ID: " + id));
        personDao.delete(student);
    }
}


