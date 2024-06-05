package grado.ucb.edu.back_end_grado.dto.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountByTaskStateForGraph {
    private String description;
    private Long quantity;
}
