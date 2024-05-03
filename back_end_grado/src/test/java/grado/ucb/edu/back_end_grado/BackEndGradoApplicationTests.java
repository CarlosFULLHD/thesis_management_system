package grado.ucb.edu.back_end_grado;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskHasDateDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;

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
	public void contextLoads() {
		// Checking if there is an academic period right now
		// Test fixed
		LocalDateTime currentDate = LocalDateTime.now();
		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();
		String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I", currentYear);
		Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);

		academicPeriod.ifPresent(ap -> {
			System.out.println(ap.getSemester());
			// Checking if there are tasks assigned to Taller grado 1 for the current academic period
			List<TaskHasDateEntity> taskHasDateEntityList = taskHasDateDao.findByAcademicPeriodIdAcadAndStatusAndTaskIdTask_IsGradeoneortwo(ap, 1, 1);
			taskHasDateEntityList.forEach(task -> System.out.println(task.getTaskIdTask().getTask()));
		});
	}
}
