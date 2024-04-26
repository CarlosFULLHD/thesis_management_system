package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PersonDao extends JpaRepository<PersonEntity,Long> {
    Optional<PersonEntity> findByIdPersonAndStatus(Long idPerson, int status);


    Optional<PersonEntity> findByEmail(String email); // Replace if it's necesary BY CRIS

    @Query("SELECT p FROM person p LEFT JOIN users u ON p.idPerson = u.personIdPerson.idPerson WHERE p.status = :status AND u.personIdPerson IS NULL")
    List<PersonEntity> getPersonWithoutUser(int status, Pageable pageable);

    @Query("SELECT p FROM person p LEFT JOIN users u ON p.idPerson = u.personIdPerson.idPerson LEFT JOIN roles r ON u.roleHasPersonEntity.rolesIdRole.idRole = r.idRole WHERE u.status = :status AND r.userRole = 'ESTUDIANTE'")
    List<PersonEntity> getActiveStudents(int status, Pageable pageable);


    //Filtrado
    @Query("SELECT p FROM person p LEFT JOIN users u ON p.idPerson = u.personIdPerson.idPerson " +
            "WHERE p.status = :status AND u.personIdPerson IS NULL AND " +
            "(p.name LIKE %:filter% OR p.fatherLastName LIKE %:filter% OR p.motherLastName LIKE %:filter%)")
    List<PersonEntity> findFilteredPersons(@Param("filter") String filter, @Param("status") int status, Pageable pageable);

    @Query("SELECT p FROM person p LEFT JOIN users u ON p.idPerson = u.personIdPerson.idPerson " +
            "LEFT JOIN roles r ON u.roleHasPersonEntity.rolesIdRole.idRole = r.idRole " +
            "WHERE p.status = :status AND r.userRole = 'ESTUDIANTE' AND " +
            "(p.name LIKE %:filter% OR p.fatherLastName LIKE %:filter% OR p.motherLastName LIKE %:filter%)")
    List<PersonEntity> findFilteredActiveStudents(@Param("filter") String filter, @Param("status") int status, Pageable pageable);
}
