package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.FormalDefenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormalDefenseDao extends JpaRepository<FormalDefenseEntity,Long> {
    Optional<FormalDefenseEntity> findByAcademicHasGradeProfileIdAcadGrade(AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade);
}
