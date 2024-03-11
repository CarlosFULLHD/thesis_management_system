package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PublicInformationDao extends JpaRepository<PublicInformationEntity, Long> {

    List<PublicInformationEntity> findByStatus(int status);

}
