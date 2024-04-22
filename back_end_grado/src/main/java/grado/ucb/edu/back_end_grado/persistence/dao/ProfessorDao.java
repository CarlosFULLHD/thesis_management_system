package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProfessorDao extends JpaRepository<PersonEntity, Long> {

    @Query(value = "SELECT p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name AS full_name, " +
            "p.description, p.email, p.cellphone, p.image_url, " +
            "array_agg(s.subject_name) AS subject_names, array_agg(t.comments) AS comments, " +
            "sn.url_linkedin, sn.icon " +
            "FROM person p " +
            "JOIN users u ON p.id_person = u.person_id_person " +
            "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
            "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
            "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
            "JOIN social_network sn ON p.id_person = sn.person_id_person " +
            "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
            "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 AND sn.icon = 'linkedin-icon' " +
            "GROUP BY p.name, p.father_last_name, p.mother_last_name, p.description, p.email, p.cellphone, p.image_url, sn.url_linkedin, sn.icon",
            nativeQuery = true)
    List<Object[]> findAllActiveProfessorsRaw();

}
