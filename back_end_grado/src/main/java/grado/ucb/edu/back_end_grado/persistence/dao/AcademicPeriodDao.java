package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AcademicPeriodDao extends JpaRepository<AcademicPeriodEntity, Long> {
    Optional<AcademicPeriodEntity> findBySemesterAndStatus(String semester,int status);

    Optional<AcademicPeriodEntity> findByIdAcadAndStatus(Long idAcad, int status);

    List<AcademicPeriodEntity> findAllByStatusOrderByInitDateDesc(int status);

    @Modifying
    @Transactional
    @Query("UPDATE academic_period p SET p.semester = :semester, p.initDate = :initDate ,p.endDate = :endDate, p.accountUntil = :accountUntil WHERE p.idAcad = :idAcad")
    int patchEntry(@Param("semester") String semester, @Param("initDate") LocalDateTime initDate, @Param("endDate") LocalDateTime endDate, @Param("accountUntil") LocalDateTime accountUntil, @Param("idAcad") Long idAcad);

}
