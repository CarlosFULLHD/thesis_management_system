package grado.ucb.edu.back_end_grado.dto.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorResponse {
    private Long idRolePer;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private Long assignedStudents;
}
