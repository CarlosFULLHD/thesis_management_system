package grado.ucb.edu.back_end_grado.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import grado.ucb.edu.back_end_grado.persistence.entity.TeacherHasSubjectEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TeacherHasSubjectDao extends JpaRepository<TeacherHasSubjectEntity, Long> {
    @Query("SELECT ths FROM TeacherHasSubjectEntity ths " +
            "JOIN ths.roleHasPerson rhp " +
            "JOIN rhp.usersIdUsers user " +
            "WHERE ths.subject.idSubject = :subjectId AND user.idUsers = :userId")
    Optional<TeacherHasSubjectEntity> findBySubjectIdAndUserId(Long subjectId, Long userId);
}
