package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PersonBl {
    private PersonDao personDao;

    private PersonEntity personEntity;
    private PersonResponse personResponse;

    public PersonBl(PersonDao personDao, PersonEntity personEntity, PersonResponse personResponse) {
        this.personDao = personDao;
        this.personEntity = personEntity;
        this.personResponse = personResponse;
    }

    // New person (Student) from initial form
    public Object newStudentFromInitialForm(PersonRequest request) {
        personResponse = new PersonResponse();
        try {
            // Checking if the student had use its institutional mail
            if (!request.getEmail().split("@")[1].equals("ucb.edu.bo"))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El estudiante no utiliza el correo institucional");
            // Checking if all the characters in the student CI are digits
            if (!request.getCi().chars().allMatch(Character::isDigit))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El CI del estudiante contiene caracteres prohibidos");
            // Checking if all the characters in the student phone are digits
            if (!request.getCellPhone().chars().allMatch(Character::isDigit))
                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El teléfono del estudiante contiene caracteres prohibidos");
            // Preparing response
            personEntity = request.personRequestToEntity(request);
            personEntity = personDao.save(personEntity);
            personResponse = personResponse.personEntityToResponse(personEntity);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], personResponse);
    }


public Object getStudentById(Long id) {
    try {
        Optional<PersonEntity> personEntityOptional = personDao.findById(id);
        if (personEntityOptional.isPresent()) {
            PersonEntity personEntity = personEntityOptional.get();
            PersonResponse personResponse = new PersonResponse().personEntityToResponse(personEntity);
            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], personResponse);
        } else {
            return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Estudiante no encontrado");
        }
    } catch (Exception e) {
        return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
    }
}


    public Object getAllStudents() {
        try {
            List<PersonEntity> personEntities = personDao.findAll();
            List<PersonResponse> personResponses = personEntities.stream()
                    .map(new PersonResponse()::personEntityToResponse)
                    .collect(Collectors.toList());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], personResponses);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object updateStudent(Long id, PersonRequest personRequest) {
        return null;
    }

    public Object deleteStudent(Long id) {
        return null;
    }
}
