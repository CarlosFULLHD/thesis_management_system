package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.MettingHasObservations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingHasObservationsDao extends JpaRepository<MettingHasObservations, Long> {
}
