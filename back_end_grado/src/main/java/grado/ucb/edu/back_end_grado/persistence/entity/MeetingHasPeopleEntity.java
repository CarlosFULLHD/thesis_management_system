//package grado.ucb.edu.back_end_grado.persistence.entity;
//import jakarta.persistence.*;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Component
//@Entity(name = "meeting_has_people")
//@Table(name = "meeting_has_people")
//public class MeetingHasPeopleEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_people", nullable = false)
//    private Long IdPeople;
//    @ManyToOne
//    @JoinColumn(name = "meeting_id_meeting", referencedColumnName = "id_meeting", nullable = false)
//    private MeetingEntity meetingIdMeeting;
//    @ManyToOne
//    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per", nullable = false)
//    private RoleHasPersonEntity roleHasPersonIdRolePer;
//    @Column(name = "is_done", nullable = false)
//    private int isDone;
//    @Column(name = "status", nullable = false)
//    private int status;
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private LocalDateTime createdAt;
//    @OneToMany(mappedBy = "meetingHasPeopleIdPeople", orphanRemoval = true, cascade = CascadeType.ALL)
//    List<MettingHasObservations> mettingHasObservationsList;
//
//    public Long getIdPeople() {
//        return IdPeople;
//    }
//
//    public void setIdPeople(Long idPeople) {
//        IdPeople = idPeople;
//    }
//
//    public MeetingEntity getMeetingIdMeeting() {
//        return meetingIdMeeting;
//    }
//
//    public void setMeetingIdMeeting(MeetingEntity meetingIdMeeting) {
//        this.meetingIdMeeting = meetingIdMeeting;
//    }
//
//    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
//        return roleHasPersonIdRolePer;
//    }
//
//    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
//        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
//    }
//
//    public int getIsDone() {
//        return isDone;
//    }
//
//    public void setIsDone(int isDone) {
//        this.isDone = isDone;
//    }
//
//    public int getStatus() {
//        return status;
//    }
//
//    public void setStatus(int status) {
//        this.status = status;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public List<MettingHasObservations> getMettingHasObservationsList() {
//        return mettingHasObservationsList;
//    }
//
//    public void setMettingHasObservationsList(List<MettingHasObservations> mettingHasObservationsList) {
//        this.mettingHasObservationsList = mettingHasObservationsList;
//    }
//}
