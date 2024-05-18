package grado.ucb.edu.back_end_grado.dto.response;

import org.springframework.stereotype.Component;

@Component
public class TaskResponse {
    private GradeProfileHasTaskResponse task;
    private UrlsResponse urls;
    private MeetingResponse meeting;

    public TaskResponse() {
    }

    public GradeProfileHasTaskResponse getTask() {
        return task;
    }

    public void setTask(GradeProfileHasTaskResponse task) {
        this.task = task;
    }

    public UrlsResponse getUrls() {
        return urls;
    }

    public void setUrls(UrlsResponse urls) {
        this.urls = urls;
    }

    public MeetingResponse getMeeting() {
        return meeting;
    }

    public void setMeeting(MeetingResponse meeting) {
        this.meeting = meeting;
    }
}
