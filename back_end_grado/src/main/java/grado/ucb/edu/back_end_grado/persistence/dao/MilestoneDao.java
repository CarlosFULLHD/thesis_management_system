package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.MilestoneEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
