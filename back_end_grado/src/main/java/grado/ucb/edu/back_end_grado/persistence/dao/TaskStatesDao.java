package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskStatesDao extends JpaRepository<TaskStatesEntity, Long> {
}
