package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface LecturerApplicationDao extends JpaRepository<LecturerApplicationEntity, Long> {

    List<LecturerApplicationEntity> findLecturerApplicationEntitiesByGradeProfileIdGradeProAndTutorLecturer(Optional<GradeProfileEntity> gradeProfileEntity, int tutorLecturer);

    Optional<LecturerApplicationEntity> findByGradeProfileIdGradeProAndTutorLecturerAndStatus(GradeProfileEntity gradeProfile,int tutorOrLecturer , int status);

}
