package grado.ucb.edu.back_end_grado.dto.response;

import lombok.*;

import java.util.ArrayList;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentsLecturersResponse {
    private Long idGradePro;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String email;
    private String cellPhone;
    private Long idTutorApplication;
    private Long idTutor;
    private Long[] idLecturersApplication;
    private Long[] idLecturers;
}
