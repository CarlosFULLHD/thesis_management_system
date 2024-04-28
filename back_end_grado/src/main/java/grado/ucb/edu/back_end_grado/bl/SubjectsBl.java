package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.SubjectsDao;
import grado.ucb.edu.back_end_grado.persistence.entity.SubjectsEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectsBl {
    private final SubjectsDao subjectsDao;

    public SubjectsBl(SubjectsDao subjectsDao) {
        this.subjectsDao = subjectsDao;
    }

    public Object getSubjects() {
        try {
            List<SubjectsEntity> subjectsEntityList = subjectsDao.findAllByStatus(1);
            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], subjectsEntityList);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }
}
