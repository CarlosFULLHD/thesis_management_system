package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteProfessorRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.response.ProfessorAsTutorsResponse;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailResponseById;
import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailsResponse;
import grado.ucb.edu.back_end_grado.dto.response.TutorResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.ProfessorDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TeacherHasSubjectDao;
import grado.ucb.edu.back_end_grado.persistence.dao.SocialNetworkDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;

import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class ProfessorBl {
    private final PersonDao personDao;
    private final TeacherHasSubjectDao teacherHasSubjectDao;
    private final SocialNetworkDao socialNetworkDao;

    private final UsersBl usersBl;
    private static final Logger log = LoggerFactory.getLogger(ProfessorBl.class);
    private final RoleHasPersonDao roleHasPersonDao;
    private final ProfessorDao professorDao;

    public ProfessorBl(PersonDao personDao, TeacherHasSubjectDao teacherHasSubjectDao, SocialNetworkDao socialNetworkDao, UsersBl usersBl, RoleHasPersonDao roleHasPersonDao, ProfessorDao professorDao) {
        this.personDao = personDao;
        this.teacherHasSubjectDao = teacherHasSubjectDao;
        this.socialNetworkDao = socialNetworkDao;
        this.usersBl = usersBl;
        this.roleHasPersonDao = roleHasPersonDao;
        this.professorDao = professorDao;
    }

    @Autowired



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
    public Object getAllActiveProfessors(String filter, Pageable pageable) {
        try {
            log.info("Fetching all active professors with filter: {}", filter);
            Page<Object[]> page;
            if (filter != null && !filter.trim().isEmpty()) {
                log.info("Fetching with filter");
                page = professorDao.findAllActiveProfessors(filter, pageable);
            } else {
                log.info("Fetching without filter");
                page = professorDao.findAllActiveProfessorsRaw(pageable);
            }
            log.info(page.toString());
            if (page.isEmpty()) {
                log.warn("No active professors found in the database");
                return new SuccessfulResponse("204", "No professors found", null);
            }
            log.info("Number of professors found: {}", page.getNumberOfElements());

            Map<Long, ProfessorAsTutorsResponse> professorMap = new HashMap<>();
            for (Object[] obj : page.getContent()) {
                Long personId = ((Number) obj[0]).longValue();
                String fullName = (String) obj[1];
                String email = (String) obj[2];
                String imageUrl = (String) obj[3];
                String subjectName = (String) obj[4];
                String urlLinkedin = (String) obj[5];
                String icon = (String) obj[6];

                ProfessorAsTutorsResponse.SocialNetworkInfo socialNetworkInfo = new ProfessorAsTutorsResponse.SocialNetworkInfo(urlLinkedin, icon);

                ProfessorAsTutorsResponse tutorsResponse = professorMap.getOrDefault(personId, new ProfessorAsTutorsResponse(personId, fullName, email, imageUrl, new ArrayList<>(), new ArrayList<>()));
                if (!tutorsResponse.getSubjects().contains(subjectName)) {
                    tutorsResponse.getSubjects().add(subjectName);
                }
                if (!tutorsResponse.getSocialNetworks().contains(socialNetworkInfo)) {
                    tutorsResponse.getSocialNetworks().add(socialNetworkInfo);
                }

                professorMap.put(personId, tutorsResponse);
            }


            return new SuccessfulResponse("200", "Professors retrieved successfully", new ArrayList<>(professorMap.values()));
        } catch (Exception e) {
            log.error("Error retrieving professors", e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }


    @Transactional(readOnly = true)
    public Object getProfessorById(Long personId) {
        try {
            log.info("Fetching professor details for personId: {}", personId);
            PersonEntity person = personDao.findById(personId).orElseThrow(() -> new RuntimeException("Professor not found with id: " + personId));


            List<ProfessorDetailResponseById.SubjectInfo> subjects = teacherHasSubjectDao.findByRoleHasPersonId(personId).stream()
                    .map(subject -> new ProfessorDetailResponseById.SubjectInfo(subject.getSubject().getSubjectName(), subject.getComments()))
                    .collect(Collectors.toList());

            List<ProfessorDetailResponseById.SocialNetworkInfo> socialNetworks = socialNetworkDao.findByPersonId(personId).stream()
                    .map(network -> new ProfessorDetailResponseById.SocialNetworkInfo(network.getUrlLinkedin(), network.getIcon()))
                    .collect(Collectors.toList());


            ProfessorDetailResponseById response = new ProfessorDetailResponseById(
                    person.getName() + " " + person.getFatherLastName() + " " + person.getMotherLastName(),
                    person.getDescription(),
                    person.getEmail(),
                    person.getImageUrl(),
                    subjects,
                    socialNetworks
            );

            return new SuccessfulResponse("200", "Professor details retrieved successfully", response);
        } catch (Exception e) {
            log.error("Error retrieving professor details", e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }


    private ProfessorDetailsResponse convertToProfessorDetailsResponse(Object[] obj) {
        if (obj.length < 6) {
            throw new IllegalArgumentException("The data array does not contain all required fields.");
        }

        String fullName = (String) obj[0];
        String email = (String) obj[1];
        String imageUrl = (String) obj[2];
        // Assuming obj[3] returns an array of subjects (String[])
        String[] subjectNamesArray = (String[]) obj[3];
        List<String> subjectNames = Arrays.asList(subjectNamesArray);
        String urlLinkedin = (String) obj[4];
        String icon = (String) obj[5];
        log.info("Converting DB results to ProfessorDetailsResponse, received data: {}", Arrays.toString(obj));

        return new ProfessorDetailsResponse(fullName, email, imageUrl, subjectNames, urlLinkedin, icon);
    }


    public Object getAllTutors() {
        List<Object[]> results = personDao.findActiveTutors(1);
        try {
            List<TutorResponse> responses = new ArrayList<>();

            for (Object[] result : results) {
                TutorResponse response = new TutorResponse(
                        (Long) result[0],
                        (String) result[1],
                        (String) result[2],
                        (String) result[3],
                        result[4] != null ? (Long) result[4] : 0
                );
                responses.add(response);
            }

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], responses);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    // Method to find all active lecturers, and count how many students has been assigned
    public Object getAllLecturers() {
        List<Object[]> results = personDao.findActiveLecturers(1);
        try {
            List<TutorResponse> responses = new ArrayList<>();

            for (Object[] result : results) {
                TutorResponse response = new TutorResponse(
                        (Long) result[0],
                        (String) result[1],
                        (String) result[2],
                        (String) result[3],
                        result[4] != null ? (Long) result[4] : 0
                );
                responses.add(response);
            }

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], responses);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

}