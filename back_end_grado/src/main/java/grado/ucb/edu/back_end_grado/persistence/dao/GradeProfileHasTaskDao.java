package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeProfileHasTaskDao extends JpaRepository<GradeProfileHasTaskEntity, Long> {
}
