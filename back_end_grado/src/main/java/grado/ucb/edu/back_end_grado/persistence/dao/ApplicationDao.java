package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationDao extends JpaRepository<ApplicationEntity, Long> {

    Optional<ApplicationEntity> findByIdApplicationAndStatus(Long idApplication, int status);

    // Otros métodos específicos que puedas necesitar
}
