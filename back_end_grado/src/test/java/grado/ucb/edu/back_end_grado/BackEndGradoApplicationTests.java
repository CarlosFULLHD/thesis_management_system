package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@SpringBootTest
class BackEndGradoApplicationTests {

	@Autowired
	TemporalCodeDao temporalCodeDao;
	@Autowired
	TaskDao taskDao;
	@Autowired
	GradeProfileDao gradeProfileDao;
	@Autowired
	TaskStatesDao taskStatesDao;
	@Autowired
	GradeProfileHasTaskDao gradeProfileHasTaskDao;
	@Autowired
	GradeProfileBl gradeProfileBl;
	@Autowired
	AcademicPeriodDao academicPeriodDao;
	@Autowired
	TaskHasDateDao taskHasDateDao;
	@Autowired
	TaskHasDateEntity taskHasDateEntity;



		@Test
		public void getActiveProfiles(){
		List<TaskHasDateEntity> taskHasDateEntityList = taskHasDateDao.findAllByAcademicPeriodIdAcad_IdAcadAndStatusOrderByOrderIs(24, 1);
		for (TaskHasDateEntity x : taskHasDateEntityList){
			System.out.println(x.getTaskIdTask().getTitleTask());
		}

	}

}
