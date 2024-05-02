package grado.ucb.edu.back_end_grado.dto.request;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class TaskHasDateListRequest {
    private List<TaskHasDateRequest> tasks;

    public List<TaskHasDateRequest> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskHasDateRequest> tasks) {
        this.tasks = tasks;
    }



}
