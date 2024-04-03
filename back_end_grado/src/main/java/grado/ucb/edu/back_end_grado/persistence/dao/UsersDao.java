package grado.ucb.edu.back_end_grado.persistence.dao;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersDao extends JpaRepository<UsersEntity, Long> {
}
