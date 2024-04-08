package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.persistence.dao.TemporalCodeDao;
import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BackEndGradoApplicationTests {

	@Autowired
	TemporalCodeDao temporalCodeDao;

	@Test
	void contextLoads() {

	}

	@Test
	public void newTemporalCode(){
		TemporalCodeEntity temporalCodeEntity = new TemporalCodeEntity();
		temporalCodeDao.save(temporalCodeEntity);
	}

}
