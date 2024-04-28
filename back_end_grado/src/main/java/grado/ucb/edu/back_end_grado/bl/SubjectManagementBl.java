package grado.ucb.edu.back_end_grado.bl;

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
    public Object addSubjectToProfessor(Long userId, SubjectUpdateRequest request) {
        try {
            UsersEntity user = usersDao.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            RoleHasPersonEntity roleHasPerson = roleHasPersonDao.findByUsersIdUsers_IdUsers(user.getIdUsers())
                    .orElseThrow(() -> new RuntimeException("Role mapping not found for user id: " + userId));

            SubjectsEntity newSubject = new SubjectsEntity();
            newSubject.setSubjectName(request.getSubjectName());
            newSubject.setStatus(1); // Assuming active status
            subjectDao.save(newSubject);

            TeacherHasSubjectEntity teacherHasSubject = new TeacherHasSubjectEntity();
            teacherHasSubject.setRoleHasPerson(roleHasPerson);
            teacherHasSubject.setSubject(newSubject);
            teacherHasSubject.setStatus(1); // Assuming active status
            teacherHasSubject.setComments(request.getComments());
            teacherHasSubjectDao.save(teacherHasSubject);

            return new SuccessfulResponse("200", "Subject added successfully", null);
        } catch (Exception e) {
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
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
}
