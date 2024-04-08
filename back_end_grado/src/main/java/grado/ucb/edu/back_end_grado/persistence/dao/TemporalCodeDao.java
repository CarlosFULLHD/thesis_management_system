package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TemporalCodeDao extends JpaRepository<TemporalCodeEntity, Long> {

    Optional<TemporalCodeEntity> findByTemporalCodeAndIsUsed(String temporalCode, int isUsed);

    @Modifying
    @Transactional
    @Query("UPDATE temporal_code p SET p.isUsed = 1 WHERE p.idTemporal = :idTemporal")
    int patchEntry(@Param("idTemporal") Long idTemporal);

}
