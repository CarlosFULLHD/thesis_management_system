package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskHasDateDao extends JpaRepository<TaskHasDateEntity,Long> {

    Optional<TaskHasDateEntity> findByTaskIdTask_IdTaskAndAcademicPeriodIdAcad_IdAcad(long idTask, long idAcad);

    List<TaskHasDateEntity> findAllByAcademicPeriodIdAcad_IdAcadAndStatusOrderByOrderIs(long idAcad, int status);
}
