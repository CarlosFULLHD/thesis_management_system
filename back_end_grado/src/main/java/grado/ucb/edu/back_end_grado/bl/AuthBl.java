package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthBl {

    private static final Logger LOG = LoggerFactory.getLogger(AuthBl.class);

    @Autowired
    private PersonDao personDao;

    @Autowired
    private RoleHasPersonDao roleHasPersonDao;

    @Autowired
    private RolesDao rolesDao;
/*
    @Autowired
    private PersonEntity personEntity = new PersonEntity();

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
    }*/

    public String getRole(String email) {
        Optional<PersonEntity> personEntity = personDao.findByEmail(email);

        if (personEntity.isPresent()) {
            LOG.info("Persona encontrada: " + personEntity.get().getEmail());
            List<RoleHasPersonEntity> roleHasPersonEntity = roleHasPersonDao.findByPersonIdPerson(personEntity.get());

            if (!roleHasPersonEntity.isEmpty()) {
                Optional<RolesEntity> rolesEntity = rolesDao.findById(roleHasPersonEntity.get(0).getRolesIdRole().getIdRole());
                return rolesEntity.map(RolesEntity::getUserRole).orElse(null);
            }
        }

        LOG.error("Email " + email + " no encontrado o no tiene un rol asociado");
        return null; // O podrías devolver Optional.empty() si cambias el tipo de retorno a Optional<String>
    }

}
