package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name ="milestone")
@Table(name = "milestone")
public class MilestoneEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_milestone", nullable = false)
    private Long idMilestone;
    @ManyToOne
    @JoinColumn(name = "task_states_id_task_state", referencedColumnName = "id_task_state", nullable = false)
    private TaskStatesEntity taskStatesIdTaskState;
    @ManyToOne
    @JoinColumn(name = "users_id_users", referencedColumnName = "id_users", nullable = false)
    private UsersEntity usersIdUsers;
    @Column(name ="comments", nullable = false, length = 600)
    private String comments;
    @Column(name ="url", nullable = false, length = 300)
    private String url;
    @Column(name = "plp_involved", nullable = false, length = 600)
    private String plpInvolved;
    @Column(name = "is_student_or_coordinator", nullable = false)
    private int isStudentOrCoordinator;
    @Column(name = "is_send", nullable = false)
    private int isSend;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        isStudentOrCoordinator = 1;
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdMilestone() {
        return idMilestone;
    }

    public void setIdMilestone(Long idMilestone) {
        this.idMilestone = idMilestone;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPlpInvolved() {
        return plpInvolved;
    }

    public void setPlpInvolved(String plpInvolved) {
        this.plpInvolved = plpInvolved;
    }

    public int getIsStudentOrCoordinator() {
        return isStudentOrCoordinator;
    }

    public void setIsStudentOrCoordinator(int isStudentOrCoordinator) {
        this.isStudentOrCoordinator = isStudentOrCoordinator;
    }

    public int getIsSend() {
        return isSend;
    }

    public void setIsSend(int isSend) {
        this.isSend = isSend;
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
}
