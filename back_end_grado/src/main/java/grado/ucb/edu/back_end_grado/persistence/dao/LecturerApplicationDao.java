package grado.ucb.edu.back_end_grado.persistence.dao;

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
            "LEFT JOIN lecturer_application la ON gp.idGradePro = la.gradeProfileIdGradePro.idGradePro AND la.tutorLecturer = 0 " +
            "LEFT JOIN role_has_person rhp ON la.roleHasPersonIdRolePer.idRolePer = rhp.idRolePer " +
            "WHERE gp.status = :status " +
            "AND (:filter IS NULL OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email iLIKE %:filter% OR " +
            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone iLIKE %:filter%)")
    Page<Object[]> findAllTutorsByStudentByActiveGradeProfile(@Param("filter") String filter, @Param("status") int status, Pageable pageable);

//    @Query("SELECT gp.idGradePro AS idGradePro, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name AS name, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName AS fatherLastName, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName AS motherLastName, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email AS email, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone AS cellPhone, " +
//            "la.idTutorApplication AS idTutorApplication, " +
//            "la.roleHasPersonIdRolePer.idRolePer AS idTutor, " +
//            "ARRAY_AGG(la2.idTutorApplication) AS idLecturersApplication, " +
//            "ARRAY_AGG(la2.roleHasPersonIdRolePer.idRolePer) AS idLecturers FROM grade_profile gp " +
//            "LEFT JOIN lecturer_application la ON gp.idGradePro = la.gradeProfileIdGradePro.idGradePro AND la.tutorLecturer = 0 " +
//            "LEFT JOIN role_has_person rhp ON la.roleHasPersonIdRolePer.idRolePer = rhp.idRolePer " +
//            "LEFT JOIN lecturer_application la2 ON gp.idGradePro = la.gradeProfileIdGradePro.idGradePro AND la2.tutorLecturer = 1 " +
//            "LEFT JOIN role_has_person rhp2 ON la2.roleHasPersonIdRolePer.idRolePer = rhp2.idRolePer " +
//            "WHERE gp.status = :status " +
//            "AND (:filter IS NULL OR " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name ILIKE %:filter% OR " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName ILIKE %:filter% OR " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName ILIKE %:filter% OR " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email ILIKE %:filter% OR " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone ILIKE %:filter%) " +
//            "GROUP BY gp.idGradePro, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.name, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.fatherLastName, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.motherLastName, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.email, " +
//            "gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.cellPhone, " +
//            "la.idTutorApplication, " +
//            "la.roleHasPersonIdRolePer.idRolePer")
//    Page<Object[]> findAllLecturersByStudentByActiveGradeProfile(@Param("filter") String filter, @Param("status") int status, Pageable pageable);

    @Query(value = "SELECT gp.id_grade_pro AS idGradePro, " +
            "p.name AS name, " +
            "p.father_last_name AS fatherLastName, " +
            "p.mother_last_name AS motherLastName, " +
            "p.email AS email, " +
            "p.cellphone AS cellPhone, " +
            "la.id_tutor_application AS idTutorApplication, " +
            "la.role_has_person_id_role_per AS tutor, " +
            "ARRAY_AGG(la2.id_tutor_application) AS idLecturerApplication, " +
            "ARRAY_AGG(la2.role_has_person_id_role_per) AS lecturers FROM grade_profile gp " +
            "LEFT JOIN role_has_person rhp ON gp.role_has_person_id_role_per = rhp.id_role_per " +
            "LEFT JOIN users u ON rhp.users_id_users = u.id_users " +
            "LEFT JOIN person p ON u.person_id_person = p.id_person " +
            "LEFT JOIN lecturer_application la ON la.grade_profile_id_grade_pro = gp.id_grade_pro AND la.tutorLecturer = 0 " +
            "LEFT JOIN lecturer_application la2 ON la2.grade_profile_id_grade_pro = gp.id_grade_pro AND la2.tutorlecturer = 1 " +
            "LEFT JOIN role_has_person rhp2 ON la2.role_has_person_id_role_per = rhp2.id_role_per " +
            "WHERE gp.status = :status " +
            "AND (:filter IS NULL OR " +
            "p.name ILIKE %:filter% OR " +
            "p.father_last_name ILIKE %:filter% OR " +
            "p.mother_last_name ILIKE %:filter% OR " +
            "p.email ILIKE %:filter% OR " +
            "p.cellPhone ILIKE %:filter%) " +
            "GROUP BY gp.id_grade_pro, p.name, p.father_last_name, p.mother_last_name, p.email, p.cellphone, la.id_tutor_application ", nativeQuery = true)
    Page<Object[]> findAllLecturersByStudentByActiveGradeProfile(@Param("filter") String filter, @Param("status") int status, Pageable pageable);
}
