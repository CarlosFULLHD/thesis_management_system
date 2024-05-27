package grado.ucb.edu.back_end_grado;

//import grado.ucb.edu.back_end_grado.bl.LecturerApplicationBl;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileLectureresResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class BackEndGradoApplicationTests {

	@Autowired
	private GradeProfileDao gradeProfileDao;
	@Autowired
	AcademicPeriodDao academicPeriodDao;
	@Autowired
	AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
	@Autowired
	LecturerApplicationDao lecturerApplicationDao;
	//@Autowired
	//LecturerApplicationBl lecturerApplicationBl;
	@Autowired
	GradeProfileHasTaskDao gradeProfileHasTaskDao;

	@Test
	public void tutor() {
		Integer x = gradeProfileHasTaskDao.findMaxOrderIs(1L);
		System.out.println(x);
	}



}



