package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AcademicPeriodDao extends JpaRepository<AcademicPeriodEntity, Long> {
    Optional<AcademicPeriodEntity> findBySemesterAndStatus(String semester,int status);

}
