package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteProfessorRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.ProfessorDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;

import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorBl {
    private final PersonDao personDao;
    private final UsersBl usersBl;
    private static final Logger log = LoggerFactory.getLogger(ProfessorBl.class);
    private final RoleHasPersonDao roleHasPersonDao;
    private final ProfessorDao professorDao;

    @Autowired
    public ProfessorBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao, UsersBl usersBl, ProfessorDao professorDao) {
        this.personDao = personDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.usersBl = usersBl;
        this.professorDao = professorDao;
    }


    @Transactional
    public Object registerProfessor(CompleteProfessorRegistrationRequest request) {
        try {
            log.info("Registrando un nuevo docente con CI: {}", request.getCi());

            if (request.getCi() == null || request.getName() == null || request.getEmail() == null) {
                return new UnsuccessfulResponse("400", "Datos faltantes para el registro del docente", null);
            }
            if (!request.getEmail().split("@")[1].equals("ucb.edu.bo")) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El Docente no utiliza el correo institucional");
            }
            if (!request.getCi().chars().allMatch(Character::isDigit)) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El CI del Docente contiene caracteres no permitidos");
            }
            if (!request.getCellPhone().chars().allMatch(Character::isDigit)) {
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El teléfono del Docente contiene caracteres no permitidos");
            }

            // Crear y guardar la entidad Person
            PersonEntity professor = new PersonEntity();
            professor.setCi(request.getCi());
            professor.setName(request.getName());
            professor.setFatherLastName(request.getFatherLastName());
            professor.setMotherLastName(request.getMotherLastName());
            if (request.getDescription() == null || request.getDescription().isBlank()) {
                professor.setDescription("Docente UCB La Paz");
            } else {
                professor.setDescription(request.getDescription());
            }

            professor.setEmail(request.getEmail());
            professor.setCellPhone(request.getCellPhone());
            professor.setStatus(1); // Activo
            professor.setImageUrl("sin_imagen");
            personDao.save(professor);
            log.info("Docente registrado con éxito con ID: {}", professor.getIdPerson());
            // Crear la cuenta de usuario y asignar rol DOCENTE
            UsersRequest usersRequest = new UsersRequest();
            usersRequest.setPersonIdPerson(professor);
            Object userCreationResponse = usersBl.createAccount(usersRequest, "DOCENTE");

            if (userCreationResponse instanceof UnsuccessfulResponse) {
                // Si la creación del usuario falla, retorna la respuesta
                return userCreationResponse;
            }
            log.info("Docente con cuenta y rol asignado con éxito con ID: {}", professor.getIdPerson());
            return new SuccessfulResponse("200", "Registro exitoso. Por favor, revise su correo electrónico para obtener las instrucciones de inicio de sesión.", null);

        } catch (Exception e) {
            log.error("Error al registrar docente", e);
            return new UnsuccessfulResponse("500", "Error interno del servidor", e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public Object getAllActiveProfessors(String subject, Pageable pageable) {
        try {
            Page<Object[]> page;
            if (subject != null && !subject.trim().isEmpty()) {
                page = professorDao.findAllActiveProfessors(subject, pageable);
            } else {
                page = professorDao.findAllActiveProfessorsRaw(pageable);
            }
            if (page.isEmpty()) {
                return new UnsuccessfulResponse("404", "No professors found", null);
            }

            List<ProfessorDetailsResponse> professors = page.getContent().stream()
                    .map(this::convertToProfessorDetailsResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse("200", "Professors retrieved successfully", professors);
        } catch (Exception e) {
            log.error("Error retrieving professors", e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    private ProfessorDetailsResponse convertToProfessorDetailsResponse(Object[] obj) {
        List<String> subjectNames = Arrays.asList((String[]) obj[5]);
        List<String> comments = Arrays.asList((String[]) obj[6]);
        return new ProfessorDetailsResponse(
                (String) obj[0], // fullName
                (String) obj[1], // description
                (String) obj[2], // email
                (String) obj[3], // cellphone
                (String) obj[4], // imageUrl
                subjectNames,
                comments,
                (String) obj[7], // urlLinkedin
                (String) obj[8]  // icon
        );
    }

}