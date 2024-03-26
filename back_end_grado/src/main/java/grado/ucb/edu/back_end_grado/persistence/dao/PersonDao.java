package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonDao extends JpaRepository<PersonEntity,Long> {
    Optional<PersonEntity> findByIdPersonAndStatus(Long idPerson, int status);

    List<PersonEntity> findAllByStatus(int i);
}
