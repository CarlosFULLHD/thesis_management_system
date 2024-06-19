package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.response.DesertionResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.DesertionDao;
import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.dto.request.DesertionRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DesertionBl {

    private final DesertionDao desertionDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final PersonDao personDao;
    private final UsersDao usersDao;
    private DesertionEntity desertionEntity;private EmailBl emailBl;
    private static final Logger log = LoggerFactory.getLogger(PersonBl.class);

    @Autowired
    public DesertionBl(DesertionDao desertionDao, RoleHasPersonDao roleHasPersonDao,
                       PersonDao personDao, UsersDao usersDao, EmailBl emailBl) {
        this.desertionDao = desertionDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.usersDao = usersDao;
        this.emailBl = emailBl;
        this.personDao = personDao;
    }

    public Object getGradeProfilesByUserId(Long idUsers) {
        try {
            Optional<RoleHasPersonEntity> roleHasPersonOptional = roleHasPersonDao.findByUsersIdUsers_IdUsers(idUsers);
            if (!roleHasPersonOptional.isPresent()) {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No role has person found with the given user id.");
            }

            RoleHasPersonEntity roleHasPerson = roleHasPersonOptional.get();
            List<GradeProfileEntity> gradeProfiles = roleHasPerson.getGradeProfileEntityList();
            if (gradeProfiles.isEmpty()) {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No grade profiles found for the given role has person.");
            }

            List<GradeProfileResponse> gradeProfileResponses = gradeProfiles.stream()
                    .map(new GradeProfileResponse()::gradeProfileEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileResponses);
        } catch (Exception e) {
            log.error("Error retrieving grade profiles by user id: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object getAllDesertionsBl(Pageable pageable){
        try{
            Page<DesertionEntity> desertionEntities = desertionDao.findAll(pageable);
            List<DesertionResponse> desertionResponses = desertionEntities.stream()
                    .map(new DesertionResponse()::desertionEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], desertionResponses);
        } catch (Exception e){
            log.error("Error:"+e);
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    //cambio de estado
    public Object updateDesertionStatus(Long idDesertion, Integer status, String reason) {
        try {
            Optional<DesertionEntity> desertionEntityOptional = desertionDao.findById(idDesertion);
            if (desertionEntityOptional.isPresent()) {
                DesertionEntity desertionEntity = desertionEntityOptional.get();
                desertionEntity.setStatus(status);
                desertionEntity.setReason(reason); // Set the reason for the status change
                DesertionEntity updatedDesertion = desertionDao.save(desertionEntity);

                UsersEntity usersEntity = updatedDesertion.getUsersIdUsers();
                if (usersEntity == null) {
                    throw new RuntimeException("User entity is not associated with the desertion request");
                }

                String status_text = "rechazado";

                String email = usersEntity.getPersonIdPerson().getEmail();
                String htmlBody = desertionStateHtmlBodyEmail(usersEntity.getUsername(), status_text, updatedDesertion.getReason());
                emailBl.sendNewAccountData(email, "Se actualizó el estado de tu solicitud de abandono", htmlBody);

                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Status updated successfully for idDesertion " + idDesertion);
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Desertion with idDesertion " + idDesertion + " not found");
            }
        } catch (Exception e) {
            log.error("Error updating desertion status: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }
    public Object updateDesertionAcceptStatus(Long idDesertion, Integer status) {
        try {
            Optional<DesertionEntity> desertionEntityOptional = desertionDao.findById(idDesertion);
            if (desertionEntityOptional.isPresent()) {
                DesertionEntity desertionEntity = desertionEntityOptional.get();
                desertionEntity.setStatus(status);
                UsersEntity usersEntity = desertionEntity.getUsersIdUsers();

                if (usersEntity == null) {
                    throw new RuntimeException("User entity is not associated with the desertion request");
                }

                // Actualizar el estado del UsersEntity
                usersEntity.setStatus(0);  // Ejemplo: Actualizar a estado 0
                usersDao.save(usersEntity);  // Guardar los cambios del UsersEntity

                DesertionEntity updatedDesertion = desertionDao.save(desertionEntity);

                String status_text = status == 1 ? "aceptado" : "rechazado";

                String email = usersEntity.getPersonIdPerson().getEmail();
                String htmlBody = desertionStateHtmlBodyEmail(usersEntity.getUsername(), status_text, updatedDesertion.getReason());
                emailBl.sendNewAccountData(email, "Se actualizó el estado de tu solicitud de abandono", htmlBody);

                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Status updated successfully for idDesertion " + idDesertion);
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Desertion with idDesertion " + idDesertion + " not found");
            }
        } catch (Exception e) {
            log.error("Error updating desertion and user status: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }



    public Object getDesertionsByStatus(String filter, int status, Pageable pageable) {
        try {
//            List<DesertionEntity> filteredDesertions = desertionDao.findAll().stream()
//                    .filter(desertion -> desertion.getStatus() == status)
//                    .collect(Collectors.toList());
            if (filter != null && filter.isEmpty()) {
                filter = null;
            }

            Page<DesertionEntity> filteredDesertions = desertionDao.findAllDesertionEntities(filter, status, pageable);

            if (filteredDesertions.isEmpty()) {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No desertions found with status " + status);
            }

            List<DesertionResponse> desertionResponses = filteredDesertions.stream()
                    .map(new DesertionResponse()::desertionEntityToResponse)
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("data", desertionResponses);
            response.put("totalPages", Optional.of(filteredDesertions.getTotalPages()));
            response.put("totalItems", Optional.of(filteredDesertions.getTotalElements()));

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
        } catch (Exception e) {
            log.error("Error getting desertions by status: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    @Transactional
    public Object createDesertion(DesertionRequest request) {
        try {
            DesertionEntity desertionEntity = request.desertionRequestToEntity(request);
            desertionEntity.setStatus(0); // Estado 'en espera' al crear la solicitud
            desertionEntity.setCreated_at(LocalDateTime.now()); // Fecha y hora actuales
            DesertionEntity savedDesertion = desertionDao.save(desertionEntity);

            // Acceder directamente a UsersEntity a través de DesertionEntity
            UsersEntity usersEntity = savedDesertion.getUsersIdUsers();

            // Asegúrate de que UsersEntity no es nulo antes de proceder
            if (usersEntity == null) {
                throw new RuntimeException("User entity is not associated with the desertion request");
            }

            // Preparar y enviar correo electrónico
            String email = usersEntity.getPersonIdPerson().getEmail(); // Obteniendo el email del objeto Person asociado
            String htmlBody = desertionCreateHtmlBodyEmail(usersEntity.getUsername(), savedDesertion.getReason());
            emailBl.sendNewAccountData(email, "Realizaste una solicitud de abandono", htmlBody);

            // Actualizar el estado de Person a inactivo (0)
            desertionDao.updatePersonStatusToInactive(usersEntity.getIdUsers());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Desertion request created successfully");
        } catch (Exception e) {
            log.error("Error creating desertion request: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }




    // Method to create the body for a new email account
    public String desertionCreateHtmlBodyEmail(String username, String reason){
        return "<html>"
                + "<body>"
                + "<h1>Solicitaste ABANDONO para la del sistema de talleres de grado.</h1>"
                + "<h2>CUENTA: " + username +"</h2>"
                + "<p><b>Razon: </b>"+ reason + "</p>"
                + "<h2>Espera un correo con la aceptacion o rechazo de tu solicitud.</h2>"
                + "</body>"
                + "</html>";
    }
    public String desertionStateHtmlBodyEmail(String username, String status, String reason){
        return "<html>"
                + "<body>"
                + "<h1>Tu solivitud de abandono a sido "+ status+"</h1>"
                + "<h2>CUENTA: " + username +"</h2>"
                + "<p><b>Razon: </b>"+ reason + "</p>"
                + "<h2>COntactate con el director de carrera o con el coordinador para mas informacion</h2>"
                + "</body>"
                + "</html>";
    }

}