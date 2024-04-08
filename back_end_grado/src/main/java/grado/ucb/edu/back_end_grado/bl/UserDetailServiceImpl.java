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

        UsersEntity usersEntity = usersDao.findUsersEntityByUsername(username).orElseThrow(() -> new UsernameNotFoundException("El usuario " + username + " no existe."));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(usersEntity.getRoleHasPersonEntity().getRolesIdRole().getUserRole())));

        usersEntity.getRoleHasPersonEntity().getRolesIdRole().getRoleHasPermissionEntityList().stream().flatMap(role -> role.getPermissionIdPermission().getRoleHasPermissionEntityList().stream()).forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getPermissionIdPermission().getPermission())));

        return new User(usersEntity.getUsername(), usersEntity.getPassword(), authorityList);
    }

    public AuthResponse loginUser(AuthLoginrequest authLoginrequest) {

        String username = authLoginrequest.username();

        Optional<UsersEntity> usersEntity = usersDao.findUsersEntityByUsername(username);

        String password = authLoginrequest.password() + usersEntity.get().getSalt().toString();

        Authentication authentication = this.authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.createToken(authentication);
        AuthResponse authResponse = new AuthResponse(username, "User loged succesfully", accessToken, true);
        return authResponse;
    }

    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = this.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException(String.format("Invalid username or password"));
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }

        return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
    }
}
