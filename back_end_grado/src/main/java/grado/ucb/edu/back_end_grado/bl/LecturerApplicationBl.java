package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.LecturerApplicationDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LecturerApplicationBl {
    private final LecturerApplicationDao lecturerApplicationDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final GradeProfileDao gradeProfileDao;
    private final RolesDao rolesDao;
    private LecturerApplicationEntity lecturerApplicationEntity;
    private LecturerApplicationResponse lecturerApplicationResponse;

    public LecturerApplicationBl(LecturerApplicationDao lecturerApplicationDao, RoleHasPersonDao roleHasPersonDao, GradeProfileDao gradeProfileDao, RolesDao rolesDao, LecturerApplicationEntity lecturerApplicationEntity, LecturerApplicationResponse lecturerApplicationResponse) {
        this.lecturerApplicationDao = lecturerApplicationDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileDao = gradeProfileDao;
        this.rolesDao = rolesDao;
        this.lecturerApplicationEntity = lecturerApplicationEntity;
        this.lecturerApplicationResponse = lecturerApplicationResponse;
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
            if (gradeProfileDao.findByIdGradeProAndStatusProfileAndStatus(request.getGradeProfileIdGradePro().getIdGradePro(), 1, 1).isEmpty())
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
}
