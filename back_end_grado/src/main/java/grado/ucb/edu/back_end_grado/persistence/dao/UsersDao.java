package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity; // Importación faltante
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import io.micrometer.common.lang.NonNull;
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

    Optional<UsersEntity> findById( Long idUsers);


    // Ajuste para filtrar por RoleHasPersonEntity y estado
    // Asegúrate de que el método corresponda con la lógica y estructura de tu base de datos
    List<UsersEntity> findByRoleHasPersonEntityAndStatus(RoleHasPersonEntity roleHasPerson, int status);


    @Query("SELECT u FROM users u " +
            "LEFT JOIN FETCH u.personIdPerson p " +
            "LEFT JOIN FETCH u.roleHasPersonEntity r " +
            "WHERE " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :filter, '%')) " +
            "OR LOWER(p.fatherLastName) LIKE LOWER(CONCAT('%', :filter, '%')) " +
            "OR LOWER(p.motherLastName) LIKE LOWER(CONCAT('%', :filter, '%')) " +
            "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :filter, '%'))) " +
            "AND u.status = :status")
    Page<UsersEntity> findFilteredUsers(@Param("filter") String filter, @Param("status") int status, Pageable pageable);

    @Query("SELECT u FROM users u " +
            "LEFT JOIN FETCH u.personIdPerson p " +
            "LEFT JOIN FETCH u.roleHasPersonEntity r " +
            "WHERE u.status = :status")
    Page<UsersEntity> findAllUsers(@Param("status") int status, Pageable pageable);
}

