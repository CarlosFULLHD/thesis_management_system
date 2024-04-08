package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteProfessorRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorBl {
    private final PersonDao personDao;
    private static final Logger log = LoggerFactory.getLogger(ProfessorBl.class);
    private final RoleHasPersonDao roleHasPersonDao;

    @Autowired
    public ProfessorBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao) {
        this.personDao = personDao;
        this.roleHasPersonDao = roleHasPersonDao;
    }


    @Transactional
    public Object registerProfessor(CompleteProfessorRegistrationRequest request) {
        try {
            log.info("Registrando un nuevo docente con CI: {}", request.getCi());
            log.info("CompleteProfessorRegistrationRequest:" + request.toString());
            // Aquí se añaden validaciones para garantizar que los campos necesarios no sean null
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
            professor.setDescription(request.getDescription());
            professor.setEmail(request.getEmail());
            professor.setCellPhone(request.getCellPhone());
            professor.setStatus(1); // Activo
            // Asegúrate de establecer todos los campos necesarios antes de guardar
            personDao.save(professor);
            log.info("Docente registrado con éxito con ID: {}", professor.getIdPerson());

            return new SuccessfulResponse("200", "Docente registrado con éxito", professor);
        } catch (Exception e) {
            log.error("Error al registrar docente", e);
            return new UnsuccessfulResponse("500", "Error interno del servidor", e.getMessage());
        }
    }

    public Object getAllActiveProfessors() {
        try {
            List<RoleHasPersonEntity> roleHasPersonList = roleHasPersonDao.findByRolesIdRole_UserRoleAndStatus("DOCENTE", 1);
            List<ProfessorDetailsResponse> activeProfessorsDetails = roleHasPersonList.stream()
                    .filter(rhp -> rhp.getUsersIdUsers().getPersonIdPerson().getStatus() == 1)
                    .map(rhp -> {
                        var userEntity = rhp.getUsersIdUsers();
                        var personEntity = userEntity.getPersonIdPerson();
                        var roleEntity = rhp.getRolesIdRole();

                        return new ProfessorDetailsResponse(
                                personEntity.getIdPerson(),
                                personEntity.getCi(),
                                personEntity.getName(),
                                personEntity.getFatherLastName(),
                                personEntity.getMotherLastName(),
                                personEntity.getDescription(),
                                personEntity.getEmail(),
                                personEntity.getCellPhone(),
                                personEntity.getCreatedAt(),
                                userEntity.getUsername(),
                                roleEntity.getUserRole()
                        );
                    })
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], activeProfessorsDetails);
        } catch (Exception e) {
            log.error("Error al obtener profesores activos", e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }

    }
}