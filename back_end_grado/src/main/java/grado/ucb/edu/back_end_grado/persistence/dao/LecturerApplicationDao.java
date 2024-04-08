package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerApplicationDao extends JpaRepository<LecturerApplicationEntity, Long> {
}
