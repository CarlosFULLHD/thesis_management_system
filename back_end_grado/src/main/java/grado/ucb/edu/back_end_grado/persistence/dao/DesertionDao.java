package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface DesertionDao extends JpaRepository<DesertionEntity, Long>{

    @Query("SELECT d FROM desertion d WHERE d.status = :status AND " +
            "(:filter IS NULL OR " +
            "d.usersIdUsers.personIdPerson.ci iLIKE %:filter% OR " +
            "d.usersIdUsers.personIdPerson.name iLIKE %:filter% OR " +
            "d.usersIdUsers.personIdPerson.fatherLastName iLIKE %:filter% OR " +
            "d.usersIdUsers.personIdPerson.motherLastName iLIKE %:filter% OR " +
            "d.usersIdUsers.personIdPerson.email iLIKE %:filter% ) ")
    Page<DesertionEntity> findAllDesertionEntities(@Param("filter") String filter, @Param("status") int status, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE person p SET p.status = 0 "+
            "WHERE p.idPerson = (SELECT u.personIdPerson.idPerson "+
                                "FROM users u "+
                                "WHERE u.idUsers = :userId)")
    void updatePersonStatusToInactive(@Param("userId") Long userId);

}