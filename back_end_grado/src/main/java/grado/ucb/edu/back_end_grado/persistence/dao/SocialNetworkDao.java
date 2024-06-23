package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.SocialNetworkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SocialNetworkDao extends JpaRepository<SocialNetworkEntity, Long> {

    @Query("SELECT s FROM SocialNetworkEntity s " +
            "WHERE s.person.idPerson = :personId AND s.status = 1")
    List<SocialNetworkEntity> findByPersonId(@Param("personId") Long personId);

    Optional<Object> findByPerson(PersonEntity person);
}
