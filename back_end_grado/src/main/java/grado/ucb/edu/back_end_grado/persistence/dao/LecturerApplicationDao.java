package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.dto.response.StudentsTutorResponse;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LecturerApplicationDao extends JpaRepository<LecturerApplicationEntity, Long> {

    List<LecturerApplicationEntity> findLecturerApplicationEntitiesByGradeProfileIdGradeProAndTutorLecturer(Optional<GradeProfileEntity> gradeProfileEntity, int tutorLecturer);

    @Query("SELECT gp.idGradePro AS idGradePro, " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name AS name, " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName AS fatherLastName, " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName AS motherLastName, " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email AS email, " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone AS cellPhone, " +
            "la.idTutorApplication AS idTutorApplication, " +
            "la.roleHasPersonIdRolePer.idRolePer AS idRolePer, " +
            "la.tutorLecturer AS tutorLecturer FROM grade_profile gp " +
            "LEFT JOIN lecturer_application la ON gp.idGradePro = la.gradeProfileIdGradePro.idGradePro " +
            "LEFT JOIN role_has_person rhp ON la.roleHasPersonIdRolePer.idRolePer = rhp.idRolePer WHERE gp.status = :status AND " +
            "(:filter IS NULL OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone iLIKE %:filter%)")
    Page<Object[]> findAllStudentsAndProfessorsByActiveGradeProfile(@Param("filter") String filter, @Param("status") int status, Pageable pageable);
}
