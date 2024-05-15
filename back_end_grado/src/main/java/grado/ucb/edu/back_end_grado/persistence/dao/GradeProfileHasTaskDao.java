package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GradeProfileHasTaskDao extends JpaRepository<GradeProfileHasTaskEntity, Long> {

    @Query("SELECT MAX(g.orderIs) FROM grade_profile_has_task g WHERE g.academicHasGradeProfileIdAcadGrade.gradeProfileIdGradePro.idGradePro = :idGradePro")
    Integer findMaxOrderIs(@Param("idGradePro") Long idGradePro);

}
