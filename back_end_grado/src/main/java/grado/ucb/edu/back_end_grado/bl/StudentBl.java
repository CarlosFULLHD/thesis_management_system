package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.response.DescriptionResponse;
import grado.ucb.edu.back_end_grado.dto.response.StudentDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

import java.util.stream.Collectors;

@Service
public class StudentBl {
    private final PersonDao personDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final DrivesDao drivesDao;
    private final RolesDao rolesDao;
    private final UsersDao usersDao;

    private static final Logger log = LoggerFactory.getLogger(StudentBl.class);

    @Autowired
    public StudentBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao,
                     GradeProfileDao gradeProfileDao, DrivesDao drivesDao,
                     RolesDao rolesDao, UsersDao usersDao) {
        this.personDao = personDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.drivesDao = drivesDao;
        this.rolesDao = rolesDao;
        this.usersDao = usersDao;
    }
    private static final int WAITING_FOR_APPROVAL_STATUS_PERSON = 1;
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

    public Object getAllStudentsWaitingForApproval() {
        try {
            // Fetch all persons with the waiting for approval status
            List<PersonEntity> allPersons = personDao.findAllByStatus(WAITING_FOR_APPROVAL_STATUS_PERSON);

            // Filter to get only those persons who do not have an associated UsersEntity
            List<PersonEntity> personsWithoutUsers = allPersons.stream()
                    .filter(person -> person.getUsersEntity() == null)
                    .collect(Collectors.toList());

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
            person.setDescription(request.getDescription());
            person.setEmail(request.getEmail());
            person.setCellPhone(request.getCellPhone());
            person.setStatus(1); // Activo
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
