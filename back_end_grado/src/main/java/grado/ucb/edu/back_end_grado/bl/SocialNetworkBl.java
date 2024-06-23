package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.SocialNetworkUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.request.SocialNetworkCreateRequest;
import grado.ucb.edu.back_end_grado.dto.response.SocialNetworkResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.SocialNetworkDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.SocialNetworkEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public Object createSocialNetworkInfo(Long userId, SocialNetworkCreateRequest request) {
        try {
            UsersEntity user = usersDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            SocialNetworkEntity socialNetwork = new SocialNetworkEntity();
            socialNetwork.setPerson(user.getPersonIdPerson());
            socialNetwork.setUrlLinkedin(request.getUrlLinkedin());
            socialNetwork.setIcon("https://cdn-icons-png.flaticon.com/256/174/174857.png");
            socialNetwork.setStatus(1);
            socialNetwork.setCreatedAt(LocalDateTime.now());

            socialNetworkDao.save(socialNetwork);

            return new SuccessfulResponse("201", "Social network info created successfully", null);
        } catch (Exception e) {
            log.error("Error creating social network info for user ID: {}", userId, e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    @Transactional
    public Object deleteSocialNetworkInfo(Long userId, Long socialNetworkId) {
        try {
            UsersEntity user = usersDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            SocialNetworkEntity socialNetwork = socialNetworkDao.findById(socialNetworkId)
                    .orElseThrow(() -> new RuntimeException("Social network not found with id: " + socialNetworkId));

            if (!socialNetwork.getPerson().getIdPerson().equals(user.getPersonIdPerson().getIdPerson())) {
                throw new RuntimeException("The social network does not belong to the user.");
            }

            socialNetworkDao.delete(socialNetwork);

            return new SuccessfulResponse("200", "Social network info deleted successfully", null);
        } catch (Exception e) {
            log.error("Error deleting social network info for user ID: {}", userId, e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

    public Object getAllSocialNetworks(Long userId) {
        try {
            UsersEntity user = usersDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            List<SocialNetworkResponse> socialNetworks = user.getPersonIdPerson().getSocialNetworks().stream()
                    .map(sn -> new SocialNetworkResponse(sn.getIdSocial(), sn.getUrlLinkedin()))
                    .collect(Collectors.toList());

            return new SuccessfulResponse("200", "Social networks retrieved successfully", socialNetworks);
        } catch (Exception e) {
            log.error("Error retrieving social networks for user ID: {}", userId, e);
            return new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage());
        }
    }

}
