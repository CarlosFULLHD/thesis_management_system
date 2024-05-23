package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UrlsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlsDao extends JpaRepository<UrlsEntity, Long> {

    Optional<UrlsEntity> findByGradeProfileHasTaskIdTaskAndStatus(GradeProfileHasTaskEntity gradeProfileHasTaskIdTask, int status);

}
