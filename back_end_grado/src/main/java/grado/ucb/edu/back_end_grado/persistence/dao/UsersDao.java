package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity; // Importación faltante
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsersDao extends JpaRepository<UsersEntity, Long> {

    Optional<UsersEntity> findUsersEntityByUsername(String username);

    Optional<UsersEntity> findByIdUsersAndStatus(Long idUsers, int status);

//    @Query("SELECT u FROM users u LEFT JOIN roles r ON u.roleHasPersonEntity.rolesIdRole.idRole = r.idRole WHERE u.status = :status AND r.userRole = 'ESTUDIANTE'")
//    List<UsersEntity> getAllStudents(int status, Pageable pageable);

    // Ajuste para filtrar por RoleHasPersonEntity y estado
    // Asegúrate de que el método corresponda con la lógica y estructura de tu base de datos
    List<UsersEntity> findByRoleHasPersonEntityAndStatus(RoleHasPersonEntity roleHasPerson, int status);

    @Query("SELECT u FROM users u " +
            "JOIN u.personIdPerson p " +
            "LEFT JOIN u.roleHasPersonEntity rhp " +
            "LEFT JOIN rhp.rolesIdRole r " +
            "WHERE (:filter IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :filter, '%')) " +
            "OR LOWER(p.fatherLastName) LIKE LOWER(CONCAT('%', :filter, '%')) " +
            "OR LOWER(p.motherLastName) LIKE LOWER(CONCAT('%', :filter, '%')))")
    Page<UsersEntity> findAllByFilter(@Param("filter") String filter, Pageable pageable);
}

