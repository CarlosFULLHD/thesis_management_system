package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GradeProfileHasTaskDao extends JpaRepository<GradeProfileHasTaskEntity, Long> {

    @Query("SELECT gpht FROM grade_profile_has_task gpht " +
            "LEFT JOIN gpht.gradeProfileIdGradePro gp " +
            "LEFT JOIN gp.roleHasPersonIdRolePer rhp " +
            "LEFT JOIN rhp.usersIdUsers u " +
            "WHERE u.idUsers = :usersId")
    List<GradeProfileHasTaskEntity> findTasksByUserId(@Param("usersId") Long usersId);

    @Query("SELECT gpt FROM grade_profile_has_task gpt " +
            "JOIN gpt.gradeProfileIdGradePro gp " +
            "JOIN gp.lecturerApplicationEntityList la " +
            "JOIN la.roleHasPersonIdRolePer rhp " +
            "WHERE la.tutorLecturer = :tutorLecturerValue " +
            "AND rhp.idRolePer = :roleHasPersonIdRolePerValue")
    List<GradeProfileHasTaskEntity> findTasksByLecturerValue(@Param("tutorLecturerValue") int tutorLecturerValue,
                                                             @Param("roleHasPersonIdRolePerValue") Long roleHasPersonIdRolePerValue);

    List<GradeProfileHasTaskEntity> findByStatus(int status);

    GradeProfileHasTaskEntity findByGradeProfileIdGradeProAndIsTaskCurrent(GradeProfileEntity gradeProfile, int isTaskCurrent);

    List<GradeProfileHasTaskEntity> findAllByIsTaskCurrentAndStatus(int isTaskCurrent, int status);
}
