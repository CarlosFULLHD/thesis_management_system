package grado.ucb.edu.back_end_grado.persistence.dao;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RolesDao extends JpaRepository<RolesEntity, Long> {
    Optional<RolesEntity> findByIdRoleAndStatus(Long idRole, int status);
    Optional<RolesEntity> findByIdRoleAndUserRole(Long idRole, String userRole);
    Optional<RolesEntity> findById(Long idRole); // by cris
    Optional<RolesEntity> findByUserRole(String userRole);
    Optional<RolesEntity> findByIdRoleAndStatusAndUserRole(Long idRole, int status, String userRole);

}
