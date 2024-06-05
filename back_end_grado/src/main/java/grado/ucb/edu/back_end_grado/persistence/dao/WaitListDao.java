package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.WaitListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaitListDao extends JpaRepository<WaitListEntity, Long> {
}
