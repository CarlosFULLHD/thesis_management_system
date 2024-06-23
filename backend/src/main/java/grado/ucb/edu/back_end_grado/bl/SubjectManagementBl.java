package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.request.UpdateCommentsRequest;
import grado.ucb.edu.back_end_grado.dto.response.SubjectsResponse;
import grado.ucb.edu.back_end_grado.dto.response.UserSubjectsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TeacherHasSubjectDao;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.SubjectsEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TeacherHasSubjectEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import grado.ucb.edu.back_end_grado.persistence.dao.SubjectDao;
import grado.ucb.edu.back_end_grado.dto.request.SubjectUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectManagementBl {
    private final SubjectDao subjectDao;
    private final UsersDao usersDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final TeacherHasSubjectDao teacherHasSubjectDao;
    @Autowired
    public SubjectManagementBl(SubjectDao subjectDao, UsersDao usersDao, RoleHasPersonDao roleHasPersonDao, TeacherHasSubjectDao teacherHasSubjectDao) {
        this.subjectDao = subjectDao;
        this.usersDao = usersDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.teacherHasSubjectDao = teacherHasSubjectDao;
    }

    @Transactional
    public Object createAndLinkSubject(Long userId, SubjectUpdateRequest request) {
        try {
            RoleHasPersonEntity roleHasPerson = roleHasPersonDao.findByUsersIdUsers_IdUsers(userId)
                    .orElseThrow(() -> new RuntimeException("Role mapping not found for user ID: " + userId));

            SubjectsEntity newSubject = new SubjectsEntity();
            newSubject.setSubjectName(request.getSubjectName());
            newSubject.setStatus(1); // Active status
            subjectDao.save(newSubject);

            TeacherHasSubjectEntity teacherHasSubject = new TeacherHasSubjectEntity();
            teacherHasSubject.setRoleHasPerson(roleHasPerson);
            teacherHasSubject.setSubject(newSubject);
            teacherHasSubject.setComments(request.getComments());
            teacherHasSubject.setStatus(1); // Active status
            teacherHasSubjectDao.save(teacherHasSubject);

            return new SuccessfulResponse("200", "Subject created and linked successfully", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    //choose a subject
    public Object addSubjectToProfessor(Long userId, SubjectUpdateRequest request) {
        try {
            RoleHasPersonEntity roleHasPerson = roleHasPersonDao.findByUsersIdUsers_IdUsers(userId)
                    .orElseThrow(() -> new RuntimeException("Role mapping not found for user ID: " + userId));
            SubjectsEntity subject = subjectDao.findById(request.getSubjectId()).orElseThrow(() -> new RuntimeException("Subject not found with ID: " + request.getSubjectId()));

            TeacherHasSubjectEntity teacherHasSubject = new TeacherHasSubjectEntity();
            teacherHasSubject.setRoleHasPerson(roleHasPerson);
            teacherHasSubject.setSubject(subject);
            teacherHasSubject.setComments(request.getComments());
            teacherHasSubject.setStatus(1); // Active status
            teacherHasSubjectDao.save(teacherHasSubject);

            return new SuccessfulResponse("200", "Subject linked successfully", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    @Transactional
    public Object deactivateSubjectForProfessor(Long userId, Long subjectId) {
        try {
            List<TeacherHasSubjectEntity> teacherHasSubjects = teacherHasSubjectDao.findByUserIdAndSubjectId(userId, subjectId);
            if (teacherHasSubjects.isEmpty()) {
                throw new RuntimeException("No association found for the given IDs");
            }

            teacherHasSubjects.forEach(ths -> {
                ths.setStatus(0);
            });
            teacherHasSubjectDao.saveAll(teacherHasSubjects);

            return new SuccessfulResponse("200", "Subject(s) deactivated successfully", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }




    public List<SubjectsResponse> listActiveSubjects() {
        return subjectDao.findAllActiveSubjects().stream()
                .map(subject -> new SubjectsResponse(subject.getIdSubject(),subject.getSubjectName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Object updateProfessorSubject(Long userId, Long subjectId, SubjectUpdateRequest request) {
        try {
            TeacherHasSubjectEntity teacherHasSubject = teacherHasSubjectDao.findBySubjectIdAndUserId(subjectId, userId)
                    .orElseThrow(() -> new RuntimeException("Subject not found with id: " + subjectId + " for user " + userId));
            SubjectsEntity subject = teacherHasSubject.getSubject();
            subject.setSubjectName(request.getSubjectName());
            subjectDao.save(subject);

            return new SuccessfulResponse("200", "Subject updated successfully", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    public List<UserSubjectsResponse> getUserSubjectsAndComments(Long userId) {
        try {
            List<TeacherHasSubjectEntity> teacherSubjects = teacherHasSubjectDao.findByRoleHasPerson_UsersIdUsers_IdUsersOrderBySubject_IdSubjectAsc(userId);

            return teacherSubjects.stream()
                    .map(ts -> new UserSubjectsResponse(ts.getSubject().getIdSubject(), ts.getSubject().getSubjectName(), ts.getComments()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los subjects y comentarios del usuario", e);
        }
    }

    public Object updateComments(Long userId, Long subjectId, UpdateCommentsRequest request) {
        try {
            TeacherHasSubjectEntity teacherHasSubject = teacherHasSubjectDao.findByRoleHasPerson_UsersIdUsers_IdUsersAndSubject_IdSubject(userId, subjectId)
                    .orElseThrow(() -> new RuntimeException("No se encontró la relación entre el profesor y la materia"));

            teacherHasSubject.setComments(request.getComments());
            teacherHasSubjectDao.save(teacherHasSubject);

            return new SuccessfulResponse("200", "Comentarios actualizados exitosamente", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }


}
