package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskHasDateDao extends JpaRepository<TaskHasDateEntity,Long> {
}
