package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class PersonBl {
    private final PersonDao personDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final DrivesDao drivesDao;
    private final RolesDao rolesDao;

    private PersonEntity personEntity;
    private PersonResponse personResponse;
    private static final Logger log = LoggerFactory.getLogger(PersonBl.class);

    @Autowired
    public PersonBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao, GradeProfileDao gradeProfileDao, DrivesDao drivesDao, RolesDao rolesDao) {
        this.personDao = personDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.drivesDao = drivesDao;
        this.rolesDao = rolesDao;
    }

    // New person (Student) from initial form
    public Object newStudentFromInitialForm(PersonRequest request) {
        personResponse = new PersonResponse();
        try {
            // Checking if the student had use its institutional mail
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


    public Object getStudentById(Long id) {
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


    public Object getAllStudents() {
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

    // Método para crear un registro completo de un estudiante
    @Transactional
    public Object registerStudentAndDocuments(CompleteStudentRegistrationRequest request) {
        try {
            log.info("Guardando la entidad Person");
            // Crear entidad person con la información proporcionada
            PersonEntity person = new PersonEntity();
            person.setCi(request.getCi());
            person.setName(request.getName());
            person.setFatherLastName(request.getFatherLastName());
            person.setMotherLastName(request.getMotherLastName());
            person.setDescription(request.getDescription());
            person.setEmail(request.getEmail());
            person.setCellPhone(request.getCellPhone());
            person.setStatus(1); // Asumiendo que 1 es el estado 'activo'
            person = personDao.save(person);
            log.info("Persona guardada con éxito con ID: {}", person.getIdPerson());
            // Buscar el rol 'ESTUDIANTE' para asignar a la persona
            RolesEntity studentRole = rolesDao.findByUserRole("ESTUDIANTE").orElseThrow(
                    () -> new RuntimeException("Rol ESTUDIANTE no encontrado")
            );

            // Asignar rol a la persona
            RoleHasPersonEntity roleHasPerson = new RoleHasPersonEntity();
            roleHasPerson.setPersonIdPerson(person);
            roleHasPerson.setRolesIdRole(studentRole);
            roleHasPerson.setStatus(1); // Asumiendo que 1 es el estado 'activo'
            roleHasPersonDao.save(roleHasPerson);

            // Crear perfil de grado con estado 'Rechazado' (usamos NULL para representar 'Rechazado')
            GradeProfileEntity gradeProfile = new GradeProfileEntity();
            gradeProfile.setRoleHasPersonIdRolePer(roleHasPerson);
            gradeProfile.setName("Perfil " + person.getName());
            gradeProfile.setStatusProfile(null); // NULL para estado 'Rechazado'
            gradeProfile = gradeProfileDao.save(gradeProfile);

            // Para cada archivo PDF, creamos un registro en 'drives'
            for (MultipartFile pdfContent : request.getPdfFiles()) {
                DrivesEntity drive = new DrivesEntity();
                drive.setLinkdriveLetter(pdfContent.getBytes()); // Almacenamos el contenido del PDF
                drive.setStatusProfile(null); // Estado inicial 'Rechazado' representado por NULL
                drive.setUploadedAt(LocalDateTime.now()); // Fecha de carga
                // La fecha de revisión se establecerá más adelante por un coordinador
                drive.setGradeProfileIdGradePro(gradeProfile.getIdGradePro()); // Relacionamos con el perfil de grado
                drivesDao.save(drive); // Guardamos el registro de 'drive'
            }
            log.info("Registro de estudiante y documentos completado con éxito para la persona con ID: {}", person.getIdPerson());
            // Retornamos una respuesta exitosa con la entidad 'person' creada
            return new SuccessfulResponse("200", "Registro completado con éxito", person);
        } catch (Exception e) {
            // En caso de error, retornamos una respuesta de fallo
            log.error("Error al registrar estudiante y documentos", e);
            return new UnsuccessfulResponse("500", "Error al realizar el registro", e.getMessage());
        }
    }
}