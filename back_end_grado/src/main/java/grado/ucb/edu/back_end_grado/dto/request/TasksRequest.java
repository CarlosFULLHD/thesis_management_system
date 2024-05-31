package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.MeetingEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UrlsEntity;
import org.springframework.stereotype.Component;

@Component
public class TasksRequest {
    private GradeProfileHasTaskEntity task;
    private UrlsEntity urls;
    private MeetingEntity meeting;

    public TasksRequest() {
    }

    public GradeProfileHasTaskEntity getTask() {
        return task;
    }

    public void setTask(GradeProfileHasTaskEntity task) {
        this.task = task;
    }

    public UrlsEntity getUrls() {
        return urls;
    }

    public void setUrls(UrlsEntity urls) {
        this.urls = urls;
    }

    public MeetingEntity getMeeting() {
        return meeting;
    }

    public void setMeeting(MeetingEntity meeting) {
        this.meeting = meeting;
    }
}
