package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicInformationDao extends JpaRepository<PublicInformationEntity, Long> {
}
