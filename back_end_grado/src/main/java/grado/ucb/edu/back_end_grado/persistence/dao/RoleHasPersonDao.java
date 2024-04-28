package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity; // Importar RolesEntity
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoleHasPersonDao extends JpaRepository<RoleHasPersonEntity, Long> {
    Optional<RoleHasPersonEntity> findByIdRolePerAndStatus(Long idRolePer, int status);

    List<RoleHasPersonEntity> findByRolesIdRole_IdRoleAndStatus(Long idRole, int status);

    // Este método busca RoleHasPersonEntity por el nombre del rol y el estado.
    List<RoleHasPersonEntity> findByRolesIdRole_UserRoleAndStatus(String userRole, int status);

    @Query("SELECT r FROM role_has_person r JOIN FETCH r.usersIdUsers u JOIN FETCH u.personIdPerson p WHERE r.rolesIdRole.userRole = :role AND p.status = 1")
    List<RoleHasPersonEntity> findActiveProfessorsWithDetails(String role);

    // Busca las entidades RoleHasPerson basadas en el RolesEntity asociado
    List<RoleHasPersonEntity> findByRolesIdRole(RolesEntity rolesIdRole);

<<<<<<< HEAD
    Page<RoleHasPersonEntity> findByRolesIdRoleAndStatus(String docente, int i, Pageable pageable);
    Optional<RoleHasPersonEntity> findByUsersIdUsersIdUsers(Long userId);
=======
    Optional<RoleHasPersonEntity> findByUsersIdUsers_IdUsers(Long idUsers);
>>>>>>> main
}
