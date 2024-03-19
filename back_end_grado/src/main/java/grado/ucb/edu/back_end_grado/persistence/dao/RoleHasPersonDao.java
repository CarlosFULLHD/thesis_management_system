package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleHasPersonDao extends JpaRepository<RoleHasPersonEntity, Long> {
    //Optional<RoleHasPersonEntity> findByPersonIdPersonAndStatus(PersonEntity personIdPerson, int status);
    Optional<RoleHasPersonEntity> findByIdRolePerAndStatus(Long idRolPer, int status);

    Optional<RoleHasPersonEntity> findByPersonIdPerson(PersonEntity personIdPerson);
    //Optional<RoleHasPersonEntity> findByPersonIdPerson(Long idPer);
}
