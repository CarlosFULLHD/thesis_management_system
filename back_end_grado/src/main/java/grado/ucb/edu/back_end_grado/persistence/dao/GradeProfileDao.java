package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeProfileDao extends JpaRepository<GradeProfileEntity, Long> {

    Optional<GradeProfileEntity> findByIdGradeProAndStatusProfile(Long idGradePro, Integer statusProfile);

    GradeProfileEntity findByRoleHasPerson(RoleHasPersonEntity roleHasPerson);

    // Otros métodos específicos que puedas necesitar
}
