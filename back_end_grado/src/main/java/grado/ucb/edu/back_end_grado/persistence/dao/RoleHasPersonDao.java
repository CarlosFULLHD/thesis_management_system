package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleHasPersonDao extends JpaRepository<RoleHasPersonEntity, Long> {
    //Optional<RoleHasPersonEntity> findByPersonIdPersonAndStatus(PersonEntity personIdPerson, int status);
    Optional<RoleHasPersonEntity> findByIdRolePerAndStatus(Long idRolPer, int status);

    @Query("select rolesIdRole from role_has_person where personIdPerson=?1")
    RoleHasPersonEntity findByPersonIdPerson(Long idPer);
}
