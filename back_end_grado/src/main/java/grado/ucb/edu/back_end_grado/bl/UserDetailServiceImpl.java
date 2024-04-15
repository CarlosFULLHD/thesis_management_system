package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.configurations.security.Jwt.JwtUtils;
import grado.ucb.edu.back_end_grado.dto.request.AuthLoginrequest;
import grado.ucb.edu.back_end_grado.dto.response.AuthResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(UserDetailServiceImpl.class);

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersDao usersDao;

    @Autowired
    private RolesDao rolesDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOG.info("Cargando el usuario por el nombre de usuario: {}", username);
        UsersEntity usersEntity = usersDao.findUsersEntityByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + username + " no existe."));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(usersEntity.getRoleHasPersonEntity().getRolesIdRole().getUserRole())));

        usersEntity.getRoleHasPersonEntity().getRolesIdRole().getRoleHasPermissionEntityList().stream().flatMap(role -> role.getPermissionIdPermission().getRoleHasPermissionEntityList().stream()).forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getPermissionIdPermission().getPermission())));

        CustomUserDetails customUserDetails = new CustomUserDetails(usersEntity, authorityList);
        LOG.info("Usuario cargado: {}", customUserDetails.getUsername());
        //En lugar de solamente devolver usuario y password, devolvemos todo el objeto usuario
        return new CustomUserDetails(usersEntity, authorityList);
    }

    public AuthResponse loginUser(AuthLoginrequest authLoginrequest, HttpServletResponse response) {
        String username = authLoginrequest.username();
        Optional<UsersEntity> usersEntity = usersDao.findUsersEntityByUsername(username);
        if (usersEntity.isEmpty()) {
            throw new UsernameNotFoundException("El usuario " + username + " no existe.");
        }
        String password = authLoginrequest.password() + usersEntity.get().getSalt().toString();

        Authentication authentication = this.authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.createToken(authentication);
        // Devuelve el JWT directamente en la respuesta
        return new AuthResponse(username, "Usuario autenticado exitosamente", accessToken, true);
    }


    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = this.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException(String.format("Invalid username or password"));
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
        LOG.info("Authentication principal type: {}", authentication.getPrincipal().getClass());
        return authentication;
    }
}
