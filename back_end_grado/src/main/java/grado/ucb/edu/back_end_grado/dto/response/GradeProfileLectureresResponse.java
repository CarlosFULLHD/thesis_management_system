package grado.ucb.edu.back_end_grado.dto.response;


import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;

import java.util.List;

public class GradeProfileLectureresResponse {
    private GradeProfileResponse gradeProfile;
    private LecturerApplicationResponse tutor;
    private LecturerApplicationResponse lecturer;


    public GradeProfileLectureresResponse() {
    }

    public GradeProfileResponse getGradeProfile() {
        return gradeProfile;
    }

    public void setGradeProfile(GradeProfileResponse gradeProfile) {
        this.gradeProfile = gradeProfile;
    }

    public LecturerApplicationResponse getTutor() {
        return tutor;
    }

    public void setTutor(LecturerApplicationResponse tutor) {
        this.tutor = tutor;
    }

    public LecturerApplicationResponse getLecturer() {
        return lecturer;
    }

    public void setLecturer(LecturerApplicationResponse lecturer) {
        this.lecturer = lecturer;
    }
}
