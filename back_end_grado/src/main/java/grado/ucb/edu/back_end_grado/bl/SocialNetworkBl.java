package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.SocialNetworkUpdateRequest;
import grado.ucb.edu.back_end_grado.persistence.dao.SocialNetworkDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.SocialNetworkEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SocialNetworkBl {
    private final UsersDao usersDao;
    private final SocialNetworkDao socialNetworkDao;
    private static final Logger log = LoggerFactory.getLogger(SocialNetworkBl.class);

    @Autowired
    public SocialNetworkBl(UsersDao usersDao, SocialNetworkDao socialNetworkDao) {
        this.usersDao = usersDao;
        this.socialNetworkDao = socialNetworkDao;
    }

    @Transactional
    public Object updateSocialNetworkInfo(Long userId, Long socialNetworkId, SocialNetworkUpdateRequest request) {
        try {
            UsersEntity user = usersDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            SocialNetworkEntity socialNetwork = socialNetworkDao.findById(socialNetworkId)
                    .orElseThrow(() -> new RuntimeException("Social network not found with id: " + socialNetworkId));

            if (!socialNetwork.getPerson().getIdPerson().equals(user.getPersonIdPerson().getIdPerson())) {
                throw new RuntimeException("The social network does not belong to the user.");
            }

            if (request.getUrlLinkedin() != null) {
                socialNetwork.setUrlLinkedin(request.getUrlLinkedin());
            }

            socialNetworkDao.save(socialNetwork);

            return new SuccessfulResponse("200", "Social network info updated successfully", null);
        } catch (Exception e) {
            log.error("Error updating social network info for user ID: {}", userId, e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }
}
