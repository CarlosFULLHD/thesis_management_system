package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AcademicPeriodHasGradeProfileDao extends JpaRepository<AcademicPeriodHasGradeProfileEntity, Long> {
    // GET => All academic periods by AcademicPeriodIdAcad entity
    @Query("SELECT aphgp FROM academic_has_grade_profile aphgp " +
            "WHERE aphgp.academicPeriodIdAcad = :academicPeriodIdAcad " +
            "AND aphgp.status = :status " +
            "AND (:filter IS NULL " +
            "OR aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.username ILIKE %:filter% " +
            "OR aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name ILIKE %:filter% " +
            "OR aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName ILIKE %:filter% " +
            "OR aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName ILIKE %:filter% " +
            "OR aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email ILIKE %:filter% )")
    Page<AcademicPeriodHasGradeProfileEntity> findAllByAcademicPeriodIdAcadAndStatus(@Param("academicPeriodIdAcad") AcademicPeriodEntity academicPeriodIdAcad, @Param("status") int status, @Param("filter") String filter, Pageable pageable);

    // GET => One academic period with grade profile by GradeProfileEntity and AcademicPeriodEntity
    Optional<AcademicPeriodHasGradeProfileEntity> findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(AcademicPeriodEntity academicPeriodIdAcad, GradeProfileEntity gradeProfileIdGradePro, int status);
}
