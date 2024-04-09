package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.response.DesertionResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.DesertionDao;
import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.dto.request.DesertionRequest;


import java.time.LocalDateTime;
import java.util.List;
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

    public Object getAllDesertionsBl(){
        try{
            List<DesertionEntity> desertionEntities = desertionDao.findAll();
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
    public Object updateDesertionStatus(Long idDesertion, Integer status) {
        try {
            Optional<DesertionEntity> desertionEntityOptional = desertionDao.findById(idDesertion);
            if (desertionEntityOptional.isPresent()) {
                DesertionEntity desertionEntity = desertionEntityOptional.get();
                desertionEntity.setStatus(status); // Suponiendo que DesertionEntity tiene un campo 'status'
                desertionDao.save(desertionEntity);
                return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], "Status updated successfully for idDesertion " + idDesertion);
            } else {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Desertion with idDesertion " + idDesertion + " not found");
            }
        } catch (Exception e) {
            log.error("Error updating desertion status: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }
    public Object getDesertionsByStatus(int status) {
        try {
            List<DesertionEntity> filteredDesertions = desertionDao.findAll().stream()
                    .filter(desertion -> desertion.getStatus() == status)
                    .collect(Collectors.toList());
            if (filteredDesertions.isEmpty()) {
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No desertions found with status " + status);
            }
            List<DesertionResponse> desertionResponses = filteredDesertions.stream()
                    .map(new DesertionResponse()::desertionEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], desertionResponses);
        } catch (Exception e) {
            log.error("Error getting desertions by status: " + e.getMessage());
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    //Crear solicitud de abandono
    public Object createDesertion(DesertionRequest request) {
        try {
            DesertionEntity desertionEntity = request.desertionRequestToEntity(request);
            desertionEntity.setStatus(0); // Estado 'en espera' al crear la solicitud
            desertionEntity.setCreated_at(LocalDateTime.now()); // Fecha y hora actuales
            desertionDao.save(desertionEntity);
            // Obtener la entidad Users (ajuste según su lógica de negocio)
            Users usersEntity = usersDao.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

            // Preparar y enviar correo electrónico
            String htmlBody = desertionCreateHtmlBodyEmail(usersEntity.getUsername(), desertionEntity.getReason());
            emailBl.sendNewAccountData(usersEntity.getEmail(), "Realizaste una solicitud de abandono", htmlBody);

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

}
