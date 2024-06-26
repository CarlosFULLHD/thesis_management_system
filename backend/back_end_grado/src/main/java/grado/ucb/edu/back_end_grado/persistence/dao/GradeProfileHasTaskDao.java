package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface GradeProfileHasTaskDao extends JpaRepository<GradeProfileHasTaskEntity, Long> {

    /*@Query("SELECT gpht FROM grade_profile_has_task gpht " +
            "LEFT JOIN gpht.gradeProfileIdGradePro gp " +
            "LEFT JOIN gp.roleHasPersonIdRolePer rhp " +
            "LEFT JOIN rhp.usersIdUsers u " +
            "WHERE u.idUsers = :usersId")
    List<GradeProfileHasTaskEntity> findTasksByUserId(@Param("usersId") Long usersId);*/

    @Query("SELECT g FROM grade_profile_has_task g " +
            "JOIN g.academicHasGradeProfileIdAcadGrade a " +
            "JOIN a.gradeProfileIdGradePro p " +
            "JOIN p.roleHasPersonIdRolePer r " +
            "JOIN r.usersIdUsers u " +
            "WHERE u.idUsers = :userId")
    List<GradeProfileHasTaskEntity> findTasksByUserId(@Param("userId") Long userId);

    @Query("SELECT g FROM grade_profile_has_task g "+
            "JOIN g.academicHasGradeProfileIdAcadGrade a "+
            "JOIN a.gradeProfileIdGradePro p "+
            "WHERE p.idGradePro = :idGradePro")
    Page<GradeProfileHasTaskEntity> findTasksByGradeProfileId(@Param("idGradePro") Long idGradePro, Pageable pageable);

    @Query("SELECT gpht.taskStatesIdTaskState.description AS description, COALESCE(COUNT(gpht.taskStatesIdTaskState), 0) AS quantity " +
            "FROM grade_profile_has_task gpht " +
            "LEFT JOIN gpht.academicHasGradeProfileIdAcadGrade a " +
            "LEFT JOIN a.gradeProfileIdGradePro p " +
            "WHERE p.idGradePro = :idGradePro " +
            "GROUP BY gpht.taskStatesIdTaskState.description")
    List<Object[]> countByTaskStateForGraph(@Param("idGradePro") Long idGradePro);

    @Query("SELECT MAX(g.orderIs) FROM grade_profile_has_task g WHERE g.academicHasGradeProfileIdAcadGrade.gradeProfileIdGradePro.idGradePro = :idGradePro")
    Integer findMaxOrderIs(@Param("idGradePro") Long idGradePro);


    List<GradeProfileHasTaskEntity> findAllByAcademicHasGradeProfileIdAcadGradeAndStatusOrderByOrderIsAsc(AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade, int status);

}
