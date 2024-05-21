package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.MeetingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingDao extends JpaRepository<MeetingEntity, Long> {
    Optional<MeetingEntity> findByGradeProfileHasTaskIdTaskAndStatus(GradeProfileHasTaskEntity gradeProfileHasTaskIdTask, int status);

}
