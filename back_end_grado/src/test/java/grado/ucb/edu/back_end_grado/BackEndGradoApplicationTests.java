package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskHasDateDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@SpringBootTest
class BackEndGradoApplicationTests {



	@Autowired
	private AcademicPeriodDao academicPeriodDao;
	@Autowired
	private TaskHasDateDao taskHasDateDao;

	@Test
	public void contextLoads() throws Exception {

		// Checking if there is an academic period right now
		LocalDateTime currentDate = LocalDateTime.now();
		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();
		String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
		Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
		System.out.println(academicPeriod.get().getSemester());
		// Checking if there are tasks assigned to Taller grado 1 for my current academic period
		List<TaskHasDateEntity> taskHasDateEntityList = taskHasDateDao.findByAcademicPeriodIdAcadAndStatusAndTaskIdTask_IsGradeoneortwo(academicPeriod.get(),1,1);
		for (TaskHasDateEntity x : taskHasDateEntityList){
			System.out.println(x.getTaskIdTask().getTask());
		}

	}

}
