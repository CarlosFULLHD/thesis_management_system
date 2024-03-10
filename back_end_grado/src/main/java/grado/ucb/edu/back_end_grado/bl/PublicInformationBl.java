package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PublicInformationRequest;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.PublicInformationDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicInformationBl {
    private final PublicInformationDao publicINformationDao;
    private final PersonDao personDao;
    private PublicInformationEntity publicInformationEntity;
    private PublicInformationResponse publicInformationResponse;

    public PublicInformationBl(PublicInformationDao publicINformationDao, PersonDao personDao, PublicInformationEntity publicInformationEntity, PublicInformationResponse publicInformationResponse) {
        this.publicINformationDao = publicINformationDao;
        this.personDao = personDao;
        this.publicInformationEntity = publicInformationEntity;
        this.publicInformationResponse = publicInformationResponse;
    }

    // New public information
    public Object newPublicInformation(PublicInformationRequest request){
        publicInformationResponse = new PublicInformationResponse();
        try {
            Optional<PersonEntity> person = personDao.findById(request.getPersonIdPerson().getIdPerson());
            if (person.isPresent()){
                request.setPersonIdPerson(person.get());
                publicInformationEntity = request.publicInformationRequestToEntity(request);
                publicInformationEntity = publicINformationDao.save(publicInformationEntity);
                publicInformationResponse = publicInformationResponse.publicInformationEntityToResponse(publicInformationEntity);
            }

        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1],publicInformationResponse);
    }


}
