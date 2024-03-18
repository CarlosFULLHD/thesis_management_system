package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.DrivesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DrivesDao extends JpaRepository<DrivesEntity, Long> {

    List<DrivesEntity> findByStatusProfile(int statusProfile);

    Optional<DrivesEntity> findByIdDrivesAndStatusProfile(Long idDrives, int statusProfile);

    // Otros métodos específicos que puedas necesitar
}
