package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.SubjectsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectsDao extends JpaRepository<SubjectsEntity, Long> {
    List<SubjectsEntity> findAllByStatus(int status);
}
