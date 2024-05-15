package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.bl.LecturerApplicationBl;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileLectureresResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodHasGradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.LecturerApplicationDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;

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
	@Autowired
	LecturerApplicationBl lecturerApplicationBl;

	@Test
	public void tutor() {
		List<LecturerApplicationEntity> lecturerApplicationEntities = lecturerApplicationDao.findAllByRoleHasPersonIdRolePer_UsersIdUsers_IdUsersAndTutorLecturerAndStatus(4L,0,1);
		for (LecturerApplicationEntity x : lecturerApplicationEntities){
			System.out.println(x.getGradeProfileIdGradePro().getTitle());
		}
	}



}



