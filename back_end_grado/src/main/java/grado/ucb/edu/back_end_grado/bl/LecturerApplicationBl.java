package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.dto.response.RoleHasPersonResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.generator.internal.CurrentTimestampGeneration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LecturerApplicationBl {
    private final LecturerApplicationDao lecturerApplicationDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final RolesDao rolesDao;
    private final UsersDao usersDao;
    private final GradeProfileResponse gradeProfileResponse;
    private final LecturerApplicationRequest lecturerApplicationRequest;
    private LecturerApplicationEntity lecturerApplicationEntity;
    private LecturerApplicationResponse lecturerApplicationResponse;

    public LecturerApplicationBl(LecturerApplicationDao lecturerApplicationDao, RoleHasPersonDao roleHasPersonDao, GradeProfileDao gradeProfileDao, RolesDao rolesDao, LecturerApplicationEntity lecturerApplicationEntity, LecturerApplicationResponse lecturerApplicationResponse, UsersDao usersDao, GradeProfileResponse gradeProfileResponse, LecturerApplicationRequest lecturerApplicationRequest) {
        this.lecturerApplicationDao = lecturerApplicationDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.rolesDao = rolesDao;
        this.lecturerApplicationEntity = lecturerApplicationEntity;
        this.lecturerApplicationResponse = lecturerApplicationResponse;
        this.usersDao = usersDao;
        this.gradeProfileResponse = gradeProfileResponse;
        this.lecturerApplicationRequest = lecturerApplicationRequest;
    }

    // Request new tutor
    public Object requestNewTutor(LecturerApplicationRequest request){
        lecturerApplicationResponse = new LecturerApplicationResponse();
        try {
            System.out.println(request.getRoleHasPersonIdRolePer().getIdRolePer());
            Optional<RoleHasPersonEntity> roleHasPerson = roleHasPersonDao.findByIdRolePerAndStatus(request.getRoleHasPersonIdRolePer().getIdRolePer(), 1);
            // Checking if the role_has_person is currently active
            if (roleHasPerson.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe una persona con ese rol");
            Optional<RolesEntity> roles = rolesDao.findByIdRoleAndStatusAndUserRole(roleHasPerson.get().getRolesIdRole().getIdRole(), 1,"DOCENTE");
            // Checking if the roles is DOCENTE or not
            if (roles.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El rol para la persona no es el adecuado");
            // Checking if the grade profile had been accepted and is active as well
            if (gradeProfileDao.findByIdGradeProAndStatus(request.getGradeProfileIdGradePro().getIdGradePro(), 1).isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El perfil de grado no existe");
            // Preparing response
            lecturerApplicationEntity = request.lecturerApplicationRequestToEntity(request);
            lecturerApplicationEntity = lecturerApplicationDao.save(lecturerApplicationEntity);
            lecturerApplicationResponse = lecturerApplicationResponse.lecturerApplicationEntityToResponse(lecturerApplicationEntity);

        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], lecturerApplicationResponse);
    }

    public Object lecturersAssignment(String idGradeProfile) {
        try {
            Logger LOG = LoggerFactory.getLogger(LecturerApplicationDao.class);
            LOG.info("Id del perfil: " + idGradeProfile);

            Optional<GradeProfileEntity> gradeProfileEntity = gradeProfileDao.findByIdGradeProAndStatus(Long.parseLong(idGradeProfile), 1);
            LOG.info("Perfil de grado: " + gradeProfileEntity);

            List<LecturerApplicationEntity> lecturersAssignment = lecturerApplicationDao.findLecturerApplicationEntitiesByGradeProfileIdGradeProAndTutorLecturer(gradeProfileEntity, 2);

            List<PersonEntity> lecturers = new ArrayList<>();

            for (LecturerApplicationEntity lectureAssignment : lecturersAssignment) {
                lecturers.add(lectureAssignment.getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson());
            }

            List<PersonResponse> lecturersList = lecturers.stream()
                    .map(new PersonResponse()::personEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], lecturersList);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object assignTutor(Long idStudent, Long idTutor) {
        lecturerApplicationResponse = new LecturerApplicationResponse();

        try {
            Optional<GradeProfileEntity> gradeProfileEntity = gradeProfileDao.getGradeProfileByPersonId(idStudent);

            Optional<RoleHasPersonEntity> roleHasPersonEntity = roleHasPersonDao.getRoleHasPersonByPersonId(idTutor);

            if (!gradeProfileEntity.isPresent() || !roleHasPersonEntity.isPresent()) {
                return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Perfil de grado o Tutor no fue encontrado");
            }

            lecturerApplicationRequest.setRoleHasPersonIdRolePer(roleHasPersonEntity.get());
            lecturerApplicationRequest.setGradeProfileIdGradePro(gradeProfileEntity.get());
            lecturerApplicationRequest.setIsAccepted(1);
            lecturerApplicationRequest.setTutorLecturer(0);

            lecturerApplicationEntity = lecturerApplicationRequest.lecturerApplicationRequestToEntity(lecturerApplicationRequest);
            lecturerApplicationEntity = lecturerApplicationDao.save(lecturerApplicationEntity);
            lecturerApplicationResponse = lecturerApplicationResponse.lecturerApplicationEntityToResponse(lecturerApplicationEntity);

            return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], lecturerApplicationResponse);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

}
