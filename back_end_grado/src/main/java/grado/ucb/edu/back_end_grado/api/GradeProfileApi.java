package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Globals.apiVersion+"grade-profile")
public class GradeProfileApi {
    private final GradeProfileBl gradeProfileBl;
    private static final Logger LOG = LoggerFactory.getLogger(GradeProfileApi.class);

    public GradeProfileApi(GradeProfileBl gradeProfileBl) {
        this.gradeProfileBl = gradeProfileBl;
    }


}
