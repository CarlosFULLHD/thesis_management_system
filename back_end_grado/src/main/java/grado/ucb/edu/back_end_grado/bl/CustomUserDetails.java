package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
@Service
public class CustomUserDetails implements UserDetails {

    private UsersEntity user;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UsersEntity user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    // Retorna el nombre completo incluyendo el nombre, apellido paterno y materno
    public String getFullName() {
        return String.format("%s %s %s",
                user.getPersonIdPerson().getName(),
                user.getPersonIdPerson().getFatherLastName(),
                user.getPersonIdPerson().getMotherLastName());
    }
    public Long getIdUsers() {
        return user.getIdUsers();
    }

    public String getPersonName() {
        return user.getPersonIdPerson().getName();
    }

    public String getUserRole() {
        return user.getRoleHasPersonEntity().getRolesIdRole().getUserRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // Metodos de UserDetails
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}
