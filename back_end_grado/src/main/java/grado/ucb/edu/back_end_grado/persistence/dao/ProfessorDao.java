package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.dto.response.ProfessorDetailsResponse;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessorDao extends JpaRepository<PersonEntity, Long> {
        @Query(value = "SELECT p.id_person, p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name, " +
                "p.email, p.image_url, " +
                "STRING_AGG(DISTINCT s.subject_name, ', ') AS subjects, " +
                "ARRAY_TO_JSON(ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('id_social', sn.id_social, 'url_linkedin', sn.url_linkedin, 'icon', sn.icon))) AS social_networks " +
//                "sn.url_linkedin, " +
//                "sn.icon " +
                "FROM person p " +
                "JOIN users u ON p.id_person = u.person_id_person " +
                "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
                "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
                "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
                "JOIN social_network sn ON p.id_person = sn.person_id_person " +
                "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
                "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 " +
                "AND (:subjects IS NULL " +
                "OR EXISTS(" +
                "SELECT 1 FROM teacher_has_subject ths2 " +
                "JOIN subjects s2 ON ths2.subjects_id_subject = s2.id_subject " +
                "WHERE ths2.role_has_person_id_role_per = rhp.id_role_per " +
                "AND s2.subject_name IN (:subjects))) " +
                "GROUP BY p.id_person, p.name, p.father_last_name, p.mother_last_name, p.email, p.image_url",
                countQuery = "SELECT COUNT(DISTINCT p.id_person) " +
                        "FROM person p " +
                        "JOIN users u ON p.id_person = u.person_id_person " +
                        "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
                        "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
                        "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
                        "JOIN social_network sn ON p.id_person = sn.person_id_person " +
                        "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
                        "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1",
                nativeQuery = true)
        Page<Object[]> findAllActiveProfessorsRaw(@Param("subjects") List<String> subjects, Pageable pageable);

        @Query(value = "SELECT p.id_person, p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name AS fullName, " +
                "p.email, p.image_url, " +
                "STRING_AGG(DISTINCT s.subject_name, ', ') AS subjects, " +
                "ARRAY_TO_JSON(ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('url_linkedin', sn.url_linkedin, 'icon', sn.icon))) AS social_networks " +
//                "sn.url_linkedin, " +
//                "sn.icon " +
                "FROM person p " +
                "JOIN users u ON p.id_person = u.person_id_person " +
                "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
                "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
                "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
                "JOIN social_network sn ON p.id_person = sn.person_id_person " +
                "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
                "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 " +
                "AND (p.name ILIKE %:filter% OR p.father_last_name ILIKE %:filter% OR p.mother_last_name ILIKE %:filter%) " +
                "GROUP BY p.id_person, p.name, p.father_last_name, p.mother_last_name, p.email, p.image_url",
                countQuery = "SELECT COUNT(DISTINCT p.id_person) " +
                        "FROM person p " +
                        "JOIN users u ON p.id_person = u.person_id_person " +
                        "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
                        "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
                        "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
                        "JOIN social_network sn ON p.id_person = sn.person_id_person " +
                        "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
                        "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 " +
                        "AND (p.name ILIKE %:filter% OR p.father_last_name ILIKE %:filter% OR p.mother_last_name ILIKE %:filter%)",
                nativeQuery = true)
        Page<Object[]> findAllActiveProfessors(@Param("filter") String filter, Pageable pageable);



        @Query(value = "SELECT s.subject_name, t.comments " +
                "FROM teacher_has_subject t " +
                "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
                "JOIN role_has_person rhp ON t.role_has_person_id_role_per = rhp.id_role_per " +
                "JOIN users u ON rhp.users_id_users = u.id_users " +
                "WHERE u.person_id_person = :professorId " +
                "AND t.status = 1 AND s.status = 1 AND rhp.status = 1",
                nativeQuery = true)
        List<Object[]> findSubjectsByProfessorId(@Param("professorId") Long professorId);

        @Query(value = "SELECT sn.url_linkedin, sn.icon " +
                "FROM social_network sn " +
                "JOIN person p ON sn.person_id_person = p.id_person " +
                "WHERE p.id_person = :professorId " +
                "AND sn.status = 1",
                nativeQuery = true)
        List<Object[]> findSocialNetworksByProfessorId(@Param("professorId") Long professorId);



//    @Query(value = "SELECT p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name, " +
//            "p.email, p.image_url, " +
//            "array_agg(s.subject_name) as subjectNames, sn.url_linkedin, sn.icon " +
//            "FROM person p " +
//            "JOIN users u ON p.id_person = u.person_id_person " +
//            "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
//            "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
//            "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
//            "JOIN social_network sn ON p.id_person = sn.person_id_person " +
//            "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
//            "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 " +
//            "GROUP BY p.name, p.father_last_name, p.mother_last_name, p.email, p.image_url, sn.url_linkedin, sn.icon",
//            countQuery = "SELECT COUNT(*) FROM ( /* same query without SELECT clause and array_agg functions */ ) as sub",
//            nativeQuery = true)
//    Page<Object[]> findAllActiveProfessorsRaw(Pageable pageable);
//
//
//    //Para filtrado de seleccionar subject que
//    @Query(value = "SELECT p.name || ' ' || p.father_last_name || ' ' || p.mother_last_name AS fullName, " +
//            "p.email, p.image_url, " +
//            "array_agg(s.subject_name) FILTER (WHERE s.status = 1) as subjectNames, " +
//            "sn.url_linkedin, sn.icon " +
//            "FROM person p " +
//            "JOIN users u ON p.id_person = u.person_id_person " +
//            "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
//            "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
//            "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
//            "JOIN social_network sn ON p.id_person = sn.person_id_person " +
//            "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
//            "AND s.subject_name = :subject " +
//            "AND p.status = 1 AND rhp.status = 1 AND s.status = 1 AND t.status = 1 AND sn.status = 1 " +
//            "GROUP BY p.name, p.father_last_name, p.mother_last_name, p.email, p.image_url, sn.url_linkedin, sn.icon",
//            countQuery = "SELECT COUNT(DISTINCT p.id_person) " +
//                    "FROM person p " +
//                    "JOIN users u ON p.id_person = u.person_id_person " +
//                    "JOIN role_has_person rhp ON u.id_users = rhp.users_id_users " +
//                    "JOIN teacher_has_subject t ON rhp.id_role_per = t.role_has_person_id_role_per " +
//                    "JOIN subjects s ON t.subjects_id_subject = s.id_subject " +
//                    "WHERE rhp.roles_id_role = (SELECT id_role FROM roles WHERE user_role = 'DOCENTE') " +
//                    "AND s.subject_name = :subject AND p.status = 1 AND rhp.status = 1",
//            nativeQuery = true)
//    Page<Object[]> findAllActiveProfessors(@Param("subject") String subject, Pageable pageable);



}
