package grado.ucb.edu.back_end_grado;

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

	@Test
	public void contextLoads() {
		List<GradeProfileLectureresResponse> gradeProfileLectureresResponses = new ArrayList<>();

			// Checking if there is an academic period right now
			LocalDateTime currentDate = LocalDateTime.now();
			int currentYear = currentDate.getYear();
			int currentMonth = currentDate.getMonthValue();
			String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I", currentYear);
			Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);

			// Finding the grade profiles that are in that academic period
			List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList = academicPeriodHasGradeProfileDao.findAllByAcademicPeriodIdAcadAndStatus(academicPeriod.get(), 1);

			for (AcademicPeriodHasGradeProfileEntity x : academicPeriodHasGradeProfileEntityList) {
				// Getting active tutor and lecturer for the grade profile
				Optional<LecturerApplicationEntity> tutor = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(x.getGradeProfileIdGradePro(), 0, 1);
				System.out.println(tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName());
				Optional<LecturerApplicationEntity> lecturer = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(x.getGradeProfileIdGradePro(), 1, 1);

				GradeProfileLectureresResponse dk = new GradeProfileLectureresResponse();
				// Preparing response to add in the list
				dk.setGradeProfile(new GradeProfileResponse().gradeProfileEntityToResponse(x.getGradeProfileIdGradePro()));
				dk.setTutor(tutor.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(tutor.get()));
				dk.setLecturer(lecturer.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(lecturer.get()));
				gradeProfileLectureresResponses.add(dk);
			}
		}

		@Test
		public void tutor() {
			Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(3L);
			Optional<LecturerApplicationEntity> tutor = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(gradeProfile.get(), 0, 1);
			System.out.println(tutor.get().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName());

		}

}



