package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GradeProfileDao extends JpaRepository<GradeProfileEntity, Long> {

    @Query("SELECT gp FROM grade_profile gp LEFT JOIN person p ON gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.idPerson = p.idPerson WHERE gp.roleHasPersonIdRolePer.usersIdUsers.personIdPerson.idPerson = :idPeron")
    Optional<GradeProfileEntity> getGradeProfileByPersonId(@Param("idPeron") Long idPeron);

    Optional<GradeProfileEntity> findByIdGradeProAndStatus(Long idGradePro, int status);

    List<GradeProfileEntity> findByStatus(int status, Pageable pageable);

    Page<GradeProfileEntity> findAllByStatus(int status, Pageable pageable);
    //List<GradeProfileEntity> findByIsGradeoneortwoAndStatus(int isGradeoneortwo, int status, Pageable pageable);
    Page<GradeProfileEntity> findByIsGradeoneortwoAndStatus(int isGradeoneortwo, int status, Pageable pageable);

    //Filter by title
    List<GradeProfileEntity> findByTitleContainingAndStatus(String title, int status, Pageable pageable);


    // Find active grade profile by idUsers
    Optional<GradeProfileEntity> findByRoleHasPersonIdRolePer_UsersIdUsers_IdUsersAndStatus(Long idUsers, int status);


    @Modifying
    @Transactional
    @Query("UPDATE grade_profile p SET p.title = :title WHERE p.idGradePro = :idGradePro")
    int updateTitle(@Param("title") String title, @Param("idGradePro") Long idGradePro);

    @Modifying
    @Transactional
    @Query("UPDATE grade_profile p SET p.statusGraduationMode = :statusGraduationMOde WHERE p.idGradePro = :idGradePro")
    int updateStatusGraduationMode(@Param("statusGraduationMOde") int statusGraduationMOde, @Param("idGradePro") Long idGradePro);

    @Modifying
    @Transactional
    @Query("UPDATE grade_profile p SET p.isGradeoneortwo = :newWorkShop WHERE p.idGradePro = :idGradePro")
    int updateWorkShop(@Param("newWorkShop") int newWorkShop, @Param("idGradePro") Long idGradePro);
}
