package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GradeProfileDao extends JpaRepository<GradeProfileEntity, Long> {



    Optional<GradeProfileEntity> findByIdGradeProAndStatus(Long idGradePro, int status);

    List<GradeProfileEntity> findByStatus(int status, Pageable pageable);

    Page<GradeProfileEntity> findAllByStatus(int status, Pageable pageable);
    //List<GradeProfileEntity> findByIsGradeoneortwoAndStatus(int isGradeoneortwo, int status, Pageable pageable);
    Page<GradeProfileEntity> findByIsGradeoneortwoAndStatus(int isGradeoneortwo, int status, Pageable pageable);

    //Filter by title
    List<GradeProfileEntity> findByTitleContainingAndStatus(String title, int status, Pageable pageable);

    //GradeProfileEntity findByRoleHasPerson(RoleHasPersonEntity roleHasPerson);

    //List<GradeProfileEntity> findByRoleHasPersonIn(List<RoleHasPersonEntity> rolesHasPerson);

    // Find active grade profile by idUsers
    Optional<GradeProfileEntity> findByRoleHasPersonIdRolePer_UsersIdUsers_IdUsersAndStatus(Long idUsers, int status);

}
