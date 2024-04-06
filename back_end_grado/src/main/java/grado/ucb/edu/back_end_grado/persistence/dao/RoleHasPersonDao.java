package grado.ucb.edu.back_end_grado.persistence.dao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoleHasPersonDao extends JpaRepository<RoleHasPersonEntity, Long> {
    Optional<RoleHasPersonEntity> findByIdRolePerAndStatus(Long idRolPer, int status);



    List<RoleHasPersonEntity> findByRolesIdRole_IdRoleAndStatus(Long idRole, int status);

// En RoleHasPersonDao No funciona
//    List<RoleHasPersonEntity> findByUsersIdUsers_Id(Long idUsers);




}
