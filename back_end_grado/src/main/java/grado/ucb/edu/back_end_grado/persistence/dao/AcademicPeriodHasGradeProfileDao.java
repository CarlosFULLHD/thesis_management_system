package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AcademicPeriodHasGradeProfileDao extends JpaRepository<AcademicPeriodHasGradeProfileEntity, Long> {
    // GET => All academic periods by AcademicPeriodIdAcad entity
    List<AcademicPeriodHasGradeProfileEntity> findAllByAcademicPeriodIdAcadAndStatus(AcademicPeriodEntity academicPeriodIdAcad, int status);

    // GET => One academic period with grade profile by GradeProfileEntity and AcademicPeriodEntity
    Optional<AcademicPeriodHasGradeProfileEntity> findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(AcademicPeriodEntity academicPeriodIdAcad, GradeProfileEntity gradeProfileIdGradePro, int status);
}
