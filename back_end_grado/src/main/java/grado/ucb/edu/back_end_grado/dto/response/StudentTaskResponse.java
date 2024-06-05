package grado.ucb.edu.back_end_grado.dto.response;
import java.util.List;
import java.util.Map;

public class StudentTaskResponse {
    private String username;
    private String title;
    private int statusGraduationMode;
    private int status;
    private List<Map<String, Object>> tasks;

    public StudentTaskResponse(String username, String title, int statusGraduationMode, int status, List<Map<String, Object>> tasks) {
        this.username = username;
        this.title = title;
        this.statusGraduationMode = statusGraduationMode;
        this.status = status;
        this.tasks = tasks;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getStatusGraduationMode() {
        return statusGraduationMode;
    }

    public void setStatusGraduationMode(int statusGraduationMode) {
        this.statusGraduationMode = statusGraduationMode;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<Map<String, Object>> getTasks() {
        return tasks;
    }

    public void setTasks(List<Map<String, Object>> tasks) {
        this.tasks = tasks;
    }


}
