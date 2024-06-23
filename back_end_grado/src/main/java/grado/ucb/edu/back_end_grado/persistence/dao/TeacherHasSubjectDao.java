package grado.ucb.edu.back_end_grado.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import grado.ucb.edu.back_end_grado.persistence.entity.TeacherHasSubjectEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeacherHasSubjectDao extends JpaRepository<TeacherHasSubjectEntity, Long> {
    @Query("SELECT t FROM TeacherHasSubjectEntity t " +
            "JOIN FETCH t.subject s " +
            "JOIN FETCH t.roleHasPerson rhp " +
            "JOIN FETCH rhp.usersIdUsers u " +
            "WHERE u.personIdPerson.idPerson = :personId AND t.status = 1 AND s.status = 1")
    List<TeacherHasSubjectEntity> findByRoleHasPersonId(@Param("personId") Long personId);

    @Query("SELECT ths FROM TeacherHasSubjectEntity ths " +
            "JOIN ths.roleHasPerson rhp " +
            "JOIN rhp.usersIdUsers user " +
            "WHERE ths.subject.idSubject = :subjectId AND user.idUsers = :userId")
    Optional<TeacherHasSubjectEntity> findBySubjectIdAndUserId(Long subjectId, Long userId);

//    @Query("SELECT ths FROM TeacherHasSubjectEntity ths " +
//            "WHERE ths.subject.idSubject = :subjectId AND ths.roleHasPerson.usersIdUsers.idUsers = :userId")
//    Optional<TeacherHasSubjectEntity> findByUserIdAndSubjectId(Long userId, Long subjectId);

    @Query("SELECT ths FROM TeacherHasSubjectEntity ths " +
            "JOIN ths.roleHasPerson rhp " +
            "JOIN rhp.usersIdUsers u " +
            "WHERE ths.subject.idSubject = :subjectId AND u.idUsers = :userId AND ths.status = 1")
    List<TeacherHasSubjectEntity> findByUserIdAndSubjectId(Long userId, Long subjectId);

    List<TeacherHasSubjectEntity> findByRoleHasPerson_UsersIdUsers_IdUsersOrderBySubject_IdSubjectAsc(Long userId);

    Optional<TeacherHasSubjectEntity> findByRoleHasPerson_UsersIdUsers_IdUsersAndSubject_IdSubject(Long userId, Long subjectId);
}
