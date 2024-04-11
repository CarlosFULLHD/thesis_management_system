package grado.ucb.edu.back_end_grado;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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


	@Test
	void contextLoads() {

	}

	@Test
	public void newTemporalCode(){
//		TemporalCodeEntity temporalCodeEntity = new TemporalCodeEntity();
//		temporalCodeDao.save(temporalCodeEntity);
	}

	@Test
	public void getAllActiveTasksAndOrderThemById(){
//		List<TaskEntity> listTasks = new ArrayList<>();
//
//
//		Optional<GradeProfileEntity> gradeProfileEntity = gradeProfileDao.findByIdGradeProAndStatus(Long.valueOf(1),1);
//		if (!gradeProfileEntity.isEmpty()){
//			listTasks = taskDao.findAllByStatusOrderByIdTask(1);
//			Optional<TaskStatesEntity> taskStatesEntityDefaultState = taskStatesDao.findByStatusAndDescription(1,"DEFAULT");
//			Optional<TaskStatesEntity> taskStatesEntityWaitState = taskStatesDao.findByStatusAndDescription(1,"SE PERMITEN PRESENTACIONES");
//
//			if (!taskStatesEntityWaitState.isEmpty() && !taskStatesEntityDefaultState.isEmpty()){
//				for (int i = 0; i < listTasks.size(); i += 1){
//					GradeProfileHasTaskEntity gradeProfileHasTaskEntity = new GradeProfileHasTaskEntity();
//					gradeProfileHasTaskEntity.setTaskStatesIdTaskState(i == 0 ? taskStatesEntityWaitState.get() : taskStatesEntityDefaultState.get());
//					gradeProfileHasTaskEntity.setTaskIdTask(listTasks.get(i));
//					gradeProfileHasTaskEntity.setGradeProfileIdGradePro(gradeProfileEntity.get());
//					gradeProfileHasTaskEntity.setComments(i == 0 ? "Empieza por esta primera tarea" : "");
//					gradeProfileHasTaskEntity.setIsTaskDone(0);
//					gradeProfileHasTaskEntity.setIsTaskCurrent(i == 0 ? 1 : 0);
//					gradeProfileHasTaskDao.save(gradeProfileHasTaskEntity);
//					//System.out.println(gradeProfileHasTaskEntity);
//				}
//			}
		}

		@Test
		public void getActiveProfiles(){
		List<GradeProfileEntity> gradeProfileEntityList = gradeProfileDao.findByStatus(1);
		System.out.println(gradeProfileEntityList.size());
		for (GradeProfileEntity x : gradeProfileEntityList){
			System.out.println(x.toString());
		}
	}

}
