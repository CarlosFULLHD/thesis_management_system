package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TeacherHasSubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherHasSubjectDao extends JpaRepository<TeacherHasSubjectEntity, Long> {
    List<TeacherHasSubjectEntity> findTeacherHasSubjectEntitiesByRoleHaspersonIdRolePerAndStatus(RoleHasPersonEntity idRolePer, int status);
}
