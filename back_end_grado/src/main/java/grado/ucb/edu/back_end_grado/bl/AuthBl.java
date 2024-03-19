package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.configurations.security.Jwt.JwtUtils;
import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthBl {

    private static final Logger LOG = LoggerFactory.getLogger(AuthBl.class);

    @Autowired
    private PersonDao personDao;

    @Autowired
    private PersonEntity personEntity = new PersonEntity();

    @Autowired
    private RoleHasPersonDao roleHasPersonDao;

    @Autowired
    private RolesDao rolesDao;

    @Autowired
    private RolesEntity rolesEntity = new RolesEntity();

    @Autowired
    private JwtUtils jwtUtils;

    public String authtenticateAndGetToken(String email) {
        personEntity = personDao.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email " + email + " not found"));

        if (personEntity != null) {
            Optional<RoleHasPersonEntity> roleHasPersonEntity = roleHasPersonDao.findByPersonIdPerson(personEntity);
            rolesEntity = rolesDao.findById(roleHasPersonEntity.get().getRolesIdRole().getIdRole())
                    .orElseThrow(() -> new UsernameNotFoundException("Rol not found"));

            return jwtUtils.generateAccesToken(email, rolesEntity.getUserRole());
        }

        LOG.error("Email " + email + " not exist");
        return null;
    }
}
