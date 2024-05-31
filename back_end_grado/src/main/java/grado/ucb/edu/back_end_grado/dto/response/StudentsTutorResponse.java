package grado.ucb.edu.back_end_grado.dto.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentsTutorResponse {
    private Long idGradePro;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String email;
    private String cellPhone;
    private Long idTutorApplication;
    private Long idRolePer;
    private int tutorLecturer;
}
