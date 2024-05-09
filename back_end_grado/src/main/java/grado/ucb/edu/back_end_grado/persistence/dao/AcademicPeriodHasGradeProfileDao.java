package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademicPeriodHasGradeProfileDao extends JpaRepository<AcademicPeriodHasGradeProfileEntity, Long> {

    List<AcademicPeriodHasGradeProfileEntity> findAllByAcademicPeriodIdAcadAndStatus(AcademicPeriodEntity academicPeriodIdAcad, int status);
}
