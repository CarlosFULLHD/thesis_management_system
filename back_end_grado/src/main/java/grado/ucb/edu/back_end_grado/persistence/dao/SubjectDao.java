package grado.ucb.edu.back_end_grado.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import grado.ucb.edu.back_end_grado.persistence.entity.SubjectsEntity;

import java.util.List;
import java.util.Optional;

public interface SubjectDao extends JpaRepository<SubjectsEntity, Long> {
//    Optional<SubjectsEntity> findByIdSubjectAndUserId(Long idSubject, Long userId);

    @Query("SELECT s FROM SubjectsEntity s WHERE s.status = 1")
    List<SubjectsEntity> findAllActiveSubjects();
}
