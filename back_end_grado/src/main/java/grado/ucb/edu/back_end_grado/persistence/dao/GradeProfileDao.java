package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GradeProfileDao extends JpaRepository<GradeProfileEntity, Long> {

    @Query("SELECT gp FROM grade_profile gp LEFT JOIN person p ON gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.idPerson = p.idPerson WHERE gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.idPerson = :idPeron")
    Optional<GradeProfileEntity> getGradeProfileByPersonId(@Param("idPeron") Long idPeron);

    Optional<GradeProfileEntity> findByIdGradeProAndStatus(Long idGradePro, int status);

    List<GradeProfileEntity> findByStatus(int status, Pageable pageable);

    //Filter by title
    List<GradeProfileEntity> findByTitleContainingAndStatus(String title, int status, Pageable pageable);

    //GradeProfileEntity findByRoleHasPerson(RoleHasPersonEntity roleHasPerson);

    //List<GradeProfileEntity> findByRoleHasPersonIn(List<RoleHasPersonEntity> rolesHasPerson);

    // Otros métodos específicos que puedas necesitar
}
