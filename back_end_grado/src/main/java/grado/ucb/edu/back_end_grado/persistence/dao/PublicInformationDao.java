package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PublicInformationDao extends JpaRepository<PublicInformationEntity, Long> {

    List<PublicInformationEntity> findByStatus(int status);

    Optional<PublicInformationEntity> findByIdPublicInfoAndStatus(Long idPublicInfo, int status);

    @Modifying
    @Transactional
    @Query("UPDATE public_information p SET p.status = 0 WHERE p.idPublicInfo = :idPublicInfo")
    int logicDelete(@Param("idPublicInfo") Long idPublicInfo);

    @Modifying
    @Transactional
    @Query("UPDATE public_information p SET p.roleHasPersonIdRolePer.idRolePer = :idRolePer, p.title = :title ,p.information = :information, p.status = :status, p.createdAt = CURRENT_TIMESTAMP WHERE p.idPublicInfo = :idPublicInfo")
    int patchEntry(@Param("idRolePer") Long idRolePer,@Param("title") String title, @Param("information") String information, @Param("status") int status, @Param("idPublicInfo") Long idPublicInfo );

}
