package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskStatesDao extends JpaRepository<TaskStatesEntity, Long> {
    Optional<TaskStatesEntity> findByStatusAndDescription(int status, String description);
}
