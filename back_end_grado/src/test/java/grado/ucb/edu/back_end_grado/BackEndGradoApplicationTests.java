package grado.ucb.edu.back_end_grado;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;

@SpringBootTest
class BackEndGradoApplicationTests {

	@Autowired
	private AcademicPeriodDao academicPeriodDao;

	@Test
	public void contextLoads() {

	}
}
