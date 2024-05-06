package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.MilestoneEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MilestoneDao extends JpaRepository<MilestoneEntity,Long> {
    Optional<MilestoneEntity> findByUsersIdUsers(UsersEntity usersEntity);

    Optional<MilestoneEntity> findByUsersIdUsers_IdUsers(Long idUsers);
    // Custom method to find milestones between two dates
    @Query("SELECT m FROM milestone m WHERE m.createdAt BETWEEN :startDate AND :endDate")
    List<MilestoneEntity> findMilestonesBetweenDates( LocalDateTime startDate,  LocalDateTime endDate);


    // Save form milestone (STUDENT)
    @Modifying
    @Transactional
    @Query("UPDATE milestone p SET p.isSend = 0, p.url = :url WHERE p.idMilestone = :idMilestone")
    int studentSaveForm(@Param("idMilestone") Long idMilestone, @Param("url") String url);

    // Send form milestone (STUDENT)
    @Modifying
    @Transactional
    @Query("UPDATE milestone p SET p.isSend = 0, p.isStudentOrCoordinator = 2, p.taskStatesIdTaskState = :newState ,p.url = :url WHERE p.idMilestone = :idMilestone")
    int studentSendForm(@Param("idMilestone") Long idMilestone, @Param("newState")TaskStatesEntity newState, @Param("url") String url);
}
