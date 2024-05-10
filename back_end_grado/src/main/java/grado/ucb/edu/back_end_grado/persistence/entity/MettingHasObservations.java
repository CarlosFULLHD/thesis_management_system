//package grado.ucb.edu.back_end_grado.persistence.entity;
//import jakarta.persistence.*;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//
//@Component
//@Entity(name = "meeting_has_observations")
//@Table(name = "meeting_has_observations")
//public class MettingHasObservations {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_obs", nullable = false)
//    private Long idObs;
//    @ManyToOne
//    @JoinColumn(name = "meeting_has_people_id_people", referencedColumnName = "id_people", nullable = false)
//    private MeetingHasPeopleEntity meetingHasPeopleIdPeople;
//    @Column(name = "observation", length = 2000, nullable = false)
//    private String observation;
//    @Column(name = "status", nullable = false)
//    private int status;
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private LocalDateTime createdAt;
//
//    public Long getIdObs() {
//        return idObs;
//    }
//
//    public void setIdObs(Long idObs) {
//        this.idObs = idObs;
//    }
//
//    public MeetingHasPeopleEntity getMeetingHasPeopleIdPeople() {
//        return meetingHasPeopleIdPeople;
//    }
//
//    public void setMeetingHasPeopleIdPeople(MeetingHasPeopleEntity meetingHasPeopleIdPeople) {
//        this.meetingHasPeopleIdPeople = meetingHasPeopleIdPeople;
//    }
//
//    public String getObservation() {
//        return observation;
//    }
//
//    public void setObservation(String observation) {
//        this.observation = observation;
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
//}
