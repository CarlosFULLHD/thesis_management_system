package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.persistence.dao.PersonDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PersonDetails implements UserDetailsService {

    private final static Logger LOG = LoggerFactory.getLogger(PersonDetails.class);

    @Autowired
    private PersonDao personDao;

    @Autowired
    private RoleHasPersonDao roleHasPersonDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            PersonEntity personEntity = personDao.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("El email " + email + " no existe"));

            LOG.info("Persona: " + personEntity.getCi());

            RoleHasPersonEntity roleHasPersonEntity = roleHasPersonDao.findByPersonIdPerson(personEntity.getIdPerson());

            LOG.info("Rol persona: " + roleHasPersonEntity.getRolesIdRole());

            GrantedAuthority authority = personEntity.getRoleHasPersonEntityList()
                    .stream()
                    .findFirst()
                    .map(roleHasPerson -> new SimpleGrantedAuthority("ROLE_" + roleHasPerson.getRolesIdRole().getUserRole()))
                    .orElseThrow(() -> new UsernameNotFoundException("Roles del usuario " + email + " no existen"));

            //GrantedAuthority authority = new SimpleGrantedAuthority(roleHasPersonEntity.getRolesIdRole().getUserRole());

            LOG.info("Rol: " + authority);

            return new User(personEntity.getEmail(), "", Collections.singleton(authority));
        } catch (Exception e) {
            throw new UsernameNotFoundException("Error en la busqueda del usuario" + email, e);
        }
    }
}
