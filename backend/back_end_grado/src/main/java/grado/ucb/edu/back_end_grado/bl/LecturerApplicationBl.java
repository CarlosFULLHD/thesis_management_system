package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.dto.response.*;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LecturerApplicationBl {
    private final LecturerApplicationDao lecturerApplicationDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;
    private final RolesDao rolesDao;
    private final UsersDao usersDao;
    private final GradeProfileResponse gradeProfileResponse;
    private final LecturerApplicationRequest lecturerApplicationRequest;
    private LecturerApplicationEntity lecturerApplicationEntity;
    private LecturerApplicationResponse lecturerApplicationResponse;

    public LecturerApplicationBl(LecturerApplicationDao lecturerApplicationDao, RoleHasPersonDao roleHasPersonDao, GradeProfileDao gradeProfileDao, GradeProfileHasTaskDao gradeProfileHasTaskDao, RolesDao rolesDao, LecturerApplicationEntity lecturerApplicationEntity, LecturerApplicationResponse lecturerApplicationResponse, UsersDao usersDao, GradeProfileResponse gradeProfileResponse, LecturerApplicationRequest lecturerApplicationRequest) {
        this.lecturerApplicationDao = lecturerApplicationDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
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

    public Object assignProfessor(LecturerApplicationRequest request) {
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
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], lecturerApplicationResponse);
    }

    public Object findAllStudentsAndTutorsByActiveGradeProfile(String filter, Pageable pageable) {

        if (filter != null && filter.trim().isEmpty()) {
            filter = null;
        }

        Page<Object[]> results = lecturerApplicationDao.findAllTutorsByStudentByActiveGradeProfile(filter, 1, pageable);

        try {
            List<StudentsTutorResponse> responses = new ArrayList<>();

            for (Object[] result : results) {
                StudentsTutorResponse response = new StudentsTutorResponse(
                        (Long) result[0],
                        (String) result[1],
                        (String) result[2],
                        (String) result[3],
                        (String) result[4],
                        (String) result[5],
                        (Long) result[6],
                        (Long) result[7],
                        result[8] != null ? (int) result[8] : -1
                );
                responses.add(response);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("data", responses);
            response.put("totalPages", results.getTotalPages());
            response.put("totalItems", results.getTotalElements());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object findAllStudentsAndLecturersByActiveGradeProfile(String filter, Pageable pageable) {

        if (filter != null && filter.trim().isEmpty()) {
            filter = null;
        }

        Page<Object[]> results = lecturerApplicationDao.findAllLecturersByStudentByActiveGradeProfile(filter, 1, pageable);

        try {
            List<StudentsLecturersResponse> responses = new ArrayList<>();

            for (Object[] result : results) {
                Long idGradePro = ((Number) result[0]).longValue();
                String name = (String) result[1];
                String fatherLastName = (String) result[2];
                String motherLastName = (String) result[3];
                String email = (String) result[4];
                String cellPhone = (String) result[5];
                Long idTutorApplication = result[6] != null ? ((Number) result[6]).longValue() : null;
                Long idTutor = result[7] != null ? ((Number) result[7]).longValue() : null;

                Integer[] idLecturersApplicationInt = (Integer[]) result[8];
                Long[] idLecturersApplication = new Long[idLecturersApplicationInt.length];
                for (int i = 0; i < idLecturersApplicationInt.length; i++) {
                    if (idLecturersApplicationInt[i] != null)
                        idLecturersApplication[i] = idLecturersApplicationInt[i].longValue();
                }

                Integer[] idLecturersInt = (Integer[]) result[9];
                Long[] idLecturers = new Long[idLecturersInt.length];
                for (int i = 0; i < idLecturersInt.length; i++) {
                    if (idLecturersInt[i] != null)
                        idLecturers[i] = idLecturersInt[i].longValue();
                }

                StudentsLecturersResponse response = new StudentsLecturersResponse(
                        idGradePro,
                        name,
                        fatherLastName,
                        motherLastName,
                        email,
                        cellPhone,
                        idTutorApplication,
                        idTutor,
                        idLecturersApplication,
                        idLecturers
                );
                responses.add(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("data", responses);
            response.put("totalPages", results.getTotalPages());
            response.put("totalItems", results.getTotalElements());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }
    // Method to assign a tutor or lecturer to a grade profiele
    public Object assignTutorOrLecturer(Long idGradePro, Long idRolePer, boolean isLecturer, Long idLecturerApplication){
        lecturerApplicationResponse = new LecturerApplicationResponse();
        try {
            // Checking if grade profile and roleHasPerson exists
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El perfil de grado no existe");
            Optional<RoleHasPersonEntity> roleHasPerson = roleHasPersonDao.findByIdRolePerAndStatus(idRolePer, 1);
            if (roleHasPerson.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Rol inadecuado para asignar tutor");
            // Checking if there roleHasPerson has been assigned as a tutor or lecturer to the same project
            Optional<LecturerApplicationEntity> lecturerApplication = lecturerApplicationDao.findByRoleHasPersonIdRolePerAndGradeProfileIdGradeProAndTutorLecturerAndStatus(roleHasPerson.get(),gradeProfile.get(), isLecturer ? 0:1,1);
            if (!lecturerApplication.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Rol no puede tener dos papeles en perfil de gado");

            // Preparing tuple into the data base
            lecturerApplicationEntity = new LecturerApplicationEntity();
            lecturerApplicationEntity.setRoleHasPersonIdRolePer(roleHasPerson.get());
            lecturerApplicationEntity.setGradeProfileIdGradePro(gradeProfile.get());
            lecturerApplicationEntity.setIsAccepted(1);
            lecturerApplicationEntity.setTutorLecturer(isLecturer ? 1:0);

            // Checking if lecturer application exist
            if (idLecturerApplication != null) {
                Optional<LecturerApplicationEntity> lecturerApplicationEntityOptional = lecturerApplicationDao.findById(idLecturerApplication);
                lecturerApplicationEntity.setIdTutorApplication(idLecturerApplication);
                lecturerApplicationEntity.setStatus(lecturerApplicationEntityOptional.get().getStatus());
            }

            lecturerApplicationEntity = lecturerApplicationDao.save(lecturerApplicationEntity);
            // Preparing response
            lecturerApplicationResponse = lecturerApplicationResponse.lecturerApplicationEntityToResponse(lecturerApplicationEntity);

        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], lecturerApplicationResponse);
    }

    // Get all grade profiles if i'm an assigned tutor of them
    public Object getTeacherTutorGradeProfiles(Long idUsers, boolean isLecturer){
        List<LecturerApplicationResponse> lecturerApplicationResponses = new ArrayList<>();
        try {
            // Fetching data
            List<LecturerApplicationEntity> lecturerApplicationEntities = lecturerApplicationDao.findAllByRoleHasPersonIdRolePer_UsersIdUsers_IdUsersAndTutorLecturerAndStatus(idUsers, isLecturer ? 1 : 0 , 1);
            // Nulling users and preparing response
            for (LecturerApplicationEntity x : lecturerApplicationEntities){
                x.getRoleHasPersonIdRolePer().setUsersIdUsers(null);
//                x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().setUsername(null);
//                x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().setPassword(null);
//                x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().setSalt(null);
                lecturerApplicationResponses.add(new LecturerApplicationResponse().lecturerApplicationEntityToResponse(x));
            }
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], lecturerApplicationResponses);
    }

}
