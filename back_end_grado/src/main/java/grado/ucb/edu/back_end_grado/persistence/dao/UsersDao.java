package grado.ucb.edu.back_end_grado.persistence.dao;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsersDao extends JpaRepository<UsersEntity, Long> {

    Optional<UsersEntity> findUsersEntityByUsername(String username);

    Optional<UsersEntity> findByIdUsersAndStatus(Long idUsers, int status);

    // En UsersDao
    Optional<UsersEntity> findByPersonIdPerson_IdPerson(Long idPerson);
}
