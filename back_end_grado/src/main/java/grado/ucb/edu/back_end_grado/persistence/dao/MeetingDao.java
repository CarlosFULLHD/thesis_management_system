package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.MeetingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingDao extends JpaRepository<MeetingEntity, Long> {
}
