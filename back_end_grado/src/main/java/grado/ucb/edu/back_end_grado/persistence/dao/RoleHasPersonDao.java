package grado.ucb.edu.back_end_grado.persistence.dao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleHasPersonDao extends JpaRepository<RoleHasPersonEntity, Long> {
    Optional<RoleHasPersonEntity> findByIdRolePerAndStatus(Long idRolPer, int status);



    List<RoleHasPersonEntity> findByRolesIdRole_IdRoleAndStatus(Long idRole, int status);

// En RoleHasPersonDao No funciona
//    List<RoleHasPersonEntity> findByUsersIdUsers_Id(Long idUsers);

    // Este método busca RoleHasPersonEntity por el nombre del rol y el estado.
    List<RoleHasPersonEntity> findByRolesIdRole_UserRoleAndStatus(String userRole, int status);
//    @Query("SELECT p FROM PersonEntity p WHERE p.status = 1 AND p.usersEntity IS NULL")
//    List<PersonEntity> findPersonsWithNoUsers();

}
