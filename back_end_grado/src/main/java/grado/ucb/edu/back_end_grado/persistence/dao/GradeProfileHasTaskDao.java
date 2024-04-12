package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeProfileHasTaskDao extends JpaRepository<GradeProfileHasTaskEntity, Long> {

    List<GradeProfileHasTaskEntity> findByStatus(int status);

    GradeProfileHasTaskEntity findByGradeProfileIdGradeProAndIsTaskCurrent(GradeProfileEntity gradeProfile, int isTaskCurrent);

    List<GradeProfileHasTaskEntity> findAllByIsTaskCurrentAndStatus(int isTaskCurrent, int status);
}
