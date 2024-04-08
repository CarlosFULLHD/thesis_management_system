package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemporalCodeDao extends JpaRepository<TemporalCodeEntity, Long> {

}
