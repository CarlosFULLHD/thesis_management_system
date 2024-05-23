package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileHasTaskRequest;
import grado.ucb.edu.back_end_grado.dto.response.*;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GradeProfileHasTaskBl {
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;

    public GradeProfileHasTaskBl(GradeProfileHasTaskDao gradeProfileHasTaskDao) {
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
    }

    public List<TaskCustomResponse> getTasksByUserId(Long userId) {
        List<GradeProfileHasTaskEntity> taskEntities = gradeProfileHasTaskDao.findTasksByUserId(userId);
        return taskEntities.stream()
                .map(this::convertToCustomTaskResponse)
                .collect(Collectors.toList());
    }

    private TaskCustomResponse convertToCustomTaskResponse(GradeProfileHasTaskEntity entity) {
        TaskCustomResponse response = new TaskCustomResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // Setting Task State Information
        response.setIdTaskState(entity.getTaskStatesIdTaskState().getIdTaskState());
        response.setTaskStateDescription(entity.getTaskStatesIdTaskState().getDescription());
        response.setTaskStateStatus(entity.getTaskStatesIdTaskState().getStatus());

        // Setting Person Information
        response.setCi(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getCi());
        response.setName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName());
        response.setFatherLastName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName());
        response.setMotherLastName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getMotherLastName());
        response.setPersonDescription(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getDescription());
        response.setEmail(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getEmail());
        response.setCellPhone(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getCellPhone());

        // Setting Grade Profile Information
        response.setGradeProfileTitle(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getTitle());
        response.setStatusGraduationMode(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getStatusGraduationMode());
        response.setIsGradeoneortwo(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIsGradeoneortwo());

        // Setting Academic Period Information
        response.setSemester(entity.getAcademicHasGradeProfileIdAcadGrade().getAcademicPeriodIdAcad().getSemester());

        // Setting Task Information
        response.setTitleTask(entity.getTitleTask());
        response.setTask(entity.getTask());
        response.setFeedback(entity.getFeedback());
        response.setOrderIs(entity.getOrderIs());
        response.setIsUrl(entity.getIsUrl() == 1);
        response.setIsMeeting(entity.getIsMeeting() == 1);
        response.setPublicationDate(entity.getPublicationDate().format(formatter));
        response.setDeadline(entity.getDeadline().format(formatter));
        response.setTaskStatus(entity.getStatus());

        return response;
    }
}
