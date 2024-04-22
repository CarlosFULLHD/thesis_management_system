package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.dto.request.ProfessorDetailsRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProfessorDao extends JpaRepository<PersonEntity, Long> {

    @Query(value = "SELECT new grado.ucb.edu.back_end_grado.dto.request.ProfessorDetailsRequest(\n" +
            "    p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name, \n" +
            "    p.description, p.email, p.cellphone, p.image_url, \n" +
            "    s.subject_name, t.comments, sn.url_linkedin, sn.icon\n" +
            ") \n" +
            "FROM person p \n" +
            "JOIN users u ON p.id_person = u.person_id_person \n" +
            "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users \n" +
            "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per \n" +
            "JOIN subjects s ON t.subjects_id_subject = s.id_subject \n" +
            "JOIN social_network sn ON p.id_person = sn.person_id_person \n" +
            "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') \n" +
            "AND p.status = 1 \n" +
            "AND rhp.status = 1 \n" +
            "AND s.status = 1 \n" +
            "AND t.status = 1 \n" +
            "AND sn.status = 1 \n" +
            "AND sn.icon = 'linkedin-icon'\n",
            nativeQuery = true)
    List<ProfessorDetailsRequest> findAllActiveProfessors();
}
