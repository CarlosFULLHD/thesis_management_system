package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicPeriodHasGradeProfileDao extends JpaRepository<AcademicPeriodHasGradeProfileEntity, Long> {
}
