package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.response.AcademicPeriodHasGradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileLectureresResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodHasGradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import org.checkerframework.checker.units.qual.A;
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
	private GradeProfileDao gradeProfileDao;
	@Autowired
	private AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
	@Autowired
	private GradeProfileBl gradeProfileBl;

	@Test
	public void contextLoads() throws Exception {
		Object response = gradeProfileBl.getGradeProfilesWithLecturersOfTheCurrentGradeProfile();

		if (response instanceof SuccessfulResponse ){
			if (response instanceof GradeProfileLectureresResponse){
				System.out.println(response);
			}

		}



	}

}
