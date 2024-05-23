package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.SocialNetworkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SocialNetworkDao extends JpaRepository<SocialNetworkEntity, Long> {


    Optional<Object> findByPerson(PersonEntity person);
}
