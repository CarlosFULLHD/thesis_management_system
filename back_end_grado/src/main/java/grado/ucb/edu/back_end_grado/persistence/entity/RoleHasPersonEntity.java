package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "role_has_person")
@Table(name = "role_has_person")
public class RoleHasPersonEntity {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role_per", nullable = false)
    private Long idRolePer;
    @ManyToOne
    @JoinColumn(name = "roles_id_role", referencedColumnName = "id_role")
    private RolesEntity rolesIdRole;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="users_id_users", referencedColumnName = "id_users")
    private UsersEntity usersIdUsers;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "roleHasPersonIdRolePer", orphanRemoval = true, cascade = CascadeType.ALL)
    List<LecturerApplicationEntity> lecturerApplicationEntityList;
    @OneToMany(mappedBy = "roleHasPersonIdRolePer", orphanRemoval = true, cascade = CascadeType.ALL)
    List<GradeProfileEntity> gradeProfileEntityList;
    @OneToMany(mappedBy = "roleHasPersonIdRolePer", orphanRemoval = true, cascade = CascadeType.ALL)
    List<MeetingHasPeopleEntity> meetingHasPeopleEntityList;
    @OneToMany(mappedBy = "roleHaspersonIdRolePer", orphanRemoval = true, cascade = CascadeType.ALL)
    List<TeacherHasSubjectEntity> teacherHasSubjectEntityList;

   @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdRolePer() {
        return idRolePer;
    }

    public void setIdRolePer(Long idRolePer) {
        this.idRolePer = idRolePer;
    }

    public RolesEntity getRolesIdRole() {
        return rolesIdRole;
    }

    public void setRolesIdRole(RolesEntity rolesIdRole) {
        this.rolesIdRole = rolesIdRole;
    }

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<LecturerApplicationEntity> getLecturerApplicationEntityList() {
        return lecturerApplicationEntityList;
    }

    public void setLecturerApplicationEntityList(List<LecturerApplicationEntity> lecturerApplicationEntityList) {
        this.lecturerApplicationEntityList = lecturerApplicationEntityList;
    }

    public List<GradeProfileEntity> getGradeProfileEntityList() {
        return gradeProfileEntityList;
    }

    public void setGradeProfileEntityList(List<GradeProfileEntity> gradeProfileEntityList) {
        this.gradeProfileEntityList = gradeProfileEntityList;
    }

    public List<MeetingHasPeopleEntity> getMeetingHasPeopleEntityList() {
        return meetingHasPeopleEntityList;
    }

    public void setMeetingHasPeopleEntityList(List<MeetingHasPeopleEntity> meetingHasPeopleEntityList) {
        this.meetingHasPeopleEntityList = meetingHasPeopleEntityList;
    }

    public List<TeacherHasSubjectEntity> getTeacherHasSubjectEntityList() {
        return teacherHasSubjectEntityList;
    }

    public void setTeacherHasSubjectEntityList(List<TeacherHasSubjectEntity> teacherHasSubjectEntityList) {
        this.teacherHasSubjectEntityList = teacherHasSubjectEntityList;
    }
}
