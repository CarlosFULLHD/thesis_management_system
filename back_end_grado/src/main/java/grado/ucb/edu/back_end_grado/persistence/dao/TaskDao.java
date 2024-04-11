package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskDao extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findAllByStatusOrderByIdTask(int status);

    @Modifying
    @Transactional
    @Query("UPDATE task p SET p.status = 0 WHERE p.idTask = :idTask")
    int logicDelete(@Param("idTask") Long idTask);

    @Modifying
    @Transactional
    @Query("UPDATE task p SET p.titleTask = :titleTask, p.task = :task ,p.isGradeoneortwo = :isGradeoneortwo, p.status = 1,p.publicationDate = :publicationDate, p.deadline = :deadline WHERE p.idTask = :idTask")
    int patchEntry(@Param("titleTask") String titleTask, @Param("task") String task, @Param("isGradeoneortwo") int isGradeoneortwo, @Param("idTask") Long idTask, @Param("publicationDate") LocalDateTime publicationDate, @Param("deadline") LocalDateTime deadline);
}
