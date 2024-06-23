package grado.ucb.edu.back_end_grado.persistence.dao;

import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PublicInformationDao extends JpaRepository<PublicInformationEntity, Long> {

    List<PublicInformationEntity> findByStatus(int status, Pageable pageable);

    Optional<PublicInformationEntity> findByIdPublicInfoAndStatus(Long idPublicInfo, int status);

    @Modifying
    @Transactional
    @Query("UPDATE public_information p SET p.status = 0 WHERE p.idPublicInfo = :idPublicInfo")
    int logicDelete(@Param("idPublicInfo") Long idPublicInfo);

    @Modifying
    @Transactional
    @Query("UPDATE public_information p SET p.usersIdUsers.idUsers = :idUsers, p.title = :title ,p.information = :information, p.status = 1, p.createdAt = CURRENT_TIMESTAMP, p.publicationDate = :publicationDate, p.deadline = :deadline WHERE p.idPublicInfo = :idPublicInfo")
    int patchEntry(@Param("idUsers") Long idUsers, @Param("title") String title, @Param("information") String information, @Param("idPublicInfo") Long idPublicInfo, @Param("publicationDate") LocalDateTime publicationDate, @Param("deadline") LocalDateTime deadline);

    @Query("SELECT p FROM public_information p WHERE p.status = 1 AND p.publicationDate <= CURRENT_TIMESTAMP AND p.deadline >= CURRENT_TIMESTAMP")
    Page<PublicInformationEntity> findActivePublicInformationWithinCurrentTime(Pageable pageable);

}
