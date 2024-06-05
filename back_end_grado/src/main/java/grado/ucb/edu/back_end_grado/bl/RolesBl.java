package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.response.RoleResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.RolesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolesBl {

    private final RolesDao rolesDao;

    @Autowired
    public RolesBl(RolesDao rolesDao) {
        this.rolesDao = rolesDao;
    }

    public List<RoleResponse> getAllRoles() {
        List<RolesEntity> roles = rolesDao.findAll();
        return roles.stream().map(role -> new RoleResponse(role.getIdRole(), role.getUserRole())).collect(Collectors.toList());
    }
}
