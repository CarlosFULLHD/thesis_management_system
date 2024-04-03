//package grado.ucb.edu.back_end_grado.bl;
//
//import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
//import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
//import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
//import grado.ucb.edu.back_end_grado.dto.response.StudentDetailsResponse;
//import grado.ucb.edu.back_end_grado.persistence.dao.*;
//import grado.ucb.edu.back_end_grado.persistence.entity.*;
//import grado.ucb.edu.back_end_grado.util.Globals;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class StudentBl {
//    private final PersonDao personDao;
//    private final RoleHasPersonDao roleHasPersonDao;
//    private final GradeProfileDao gradeProfileDao;
//    private final DrivesDao drivesDao;
//    private final RolesDao rolesDao;
//    private static final Logger log = LoggerFactory.getLogger(StudentBl.class);
//
//    @Autowired
//    public StudentBl(PersonDao personDao, RoleHasPersonDao roleHasPersonDao,
//                     GradeProfileDao gradeProfileDao, DrivesDao drivesDao,
//                     RolesDao rolesDao) {
//        this.personDao = personDao;
//        this.roleHasPersonDao = roleHasPersonDao;
//        this.gradeProfileDao = gradeProfileDao;
//        this.drivesDao = drivesDao;
//        this.rolesDao = rolesDao;
//    }
//    private static final int WAITING_FOR_APPROVAL_STATUS_PERSON = 1;
//    private static final int WAITING_FOR_APPROVAL_STATUS_DRIVE = 0;
//    public Object getAllStudentsWaitingForApproval() {
//        try {
//
//            // Primero, obtén el rol 'ESTUDIANTE'
//            RolesEntity studentRole = rolesDao.findByUserRole("ESTUDIANTE")
//                    .orElseThrow(() -> new RuntimeException("Rol ESTUDIANTE no encontrado"));
//            // Filtrar los RoleHasPerson por el rol de 'ESTUDIANTE' y el estado de espera
//            List<RoleHasPersonEntity> roleHasPersons = roleHasPersonDao.findByRolesIdRole_IdRoleAndStatus(studentRole.getIdRole(), WAITING_FOR_APPROVAL_STATUS_PERSON);
//
//            List<StudentDetailsResponse> waitingStudentsResponse = roleHasPersons.stream().map(roleHasPerson -> {
//                PersonEntity person = roleHasPerson.getPersonIdPerson();
//                StudentDetailsResponse response = new StudentDetailsResponse(person.getIdPerson(), person.getCi(), person.getName(), person.getFatherLastName(), person.getMotherLastName(), person.getDescription(), person.getEmail(), person.getCellPhone(), person.getCreatedAt(), null);
//
//                GradeProfileEntity gradeProfile = gradeProfileDao.findByRoleHasPerson(roleHasPerson);
//                if (gradeProfile != null) {
//                    List<DrivesEntity> drivesEntities = drivesDao.findByGradeProfileIdGradeProAndStatusProfile(gradeProfile.getIdGradePro(), WAITING_FOR_APPROVAL_STATUS_DRIVE);
//                    List<StudentDetailsResponse.DriveDetails> driveDetails = drivesEntities.stream()
//                            .map(drive -> new StudentDetailsResponse.DriveDetails(drive.getLinkdriveLetter(), drive.getStatusProfile(), drive.getUploadedAt()))
//                            .collect(Collectors.toList());
//
//                    response.setDrives(driveDetails);
//                }
//
//                return response;
//            }).collect(Collectors.toList());
//
//
//            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], waitingStudentsResponse);
//        } catch (Exception e) {
//            log.error("Error al obtener estudiantes esperando aprobación", e);
//            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
//        }
//    }
//
//
//
//    // Método para crear un registro completo de un estudiante
//    @Transactional
//    public Object registerStudentAndDocuments(CompleteStudentRegistrationRequest request) {
//        try {
//            log.info("Guardando la entidad Person");
//            // Checking if the student had use its institutional mail
//            if (!request.getEmail().split("@")[1].equals("ucb.edu.bo"))
//                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El estudiante no utiliza el correo institucional");
//            // Checking if all the characters in the student CI are digits
//            if (!request.getCi().chars().allMatch(Character::isDigit))
//                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El CI del estudiante contiene caracteres prohibidos");
//            // Checking if all the characters in the student phone are digits
//            if (!request.getCellPhone().chars().allMatch(Character::isDigit))
//                return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1], "El teléfono del estudiante contiene caracteres prohibidos");
//            // Preparing response
//            // Crear entidad person con la información proporcionada
//            PersonEntity person = new PersonEntity();
//            person.setCi(request.getCi());
//            person.setName(request.getName());
//            person.setFatherLastName(request.getFatherLastName());
//            person.setMotherLastName(request.getMotherLastName());
//            person.setDescription(request.getDescription());
//            person.setEmail(request.getEmail());
//            person.setCellPhone(request.getCellPhone());
//            person.setStatus(1); // Asumiendo que 1 es el estado 'activo'
//            person = personDao.save(person);
//            log.info("Persona guardada con éxito con ID: {}", person.getIdPerson());
//            // Buscar el rol 'ESTUDIANTE' para asignar a la persona
//            // Buscar el rol 'ESTUDIANTE' para asignar a la persona
//            log.info("Buscando rol 'ESTUDIANTE'.");
//            RolesEntity studentRole = rolesDao.findByUserRole("ESTUDIANTE").orElseThrow(
//                    () -> new RuntimeException("Rol ESTUDIANTE no encontrado")
//            );
//            log.info("Asignando rol 'ESTUDIANTE' a la persona con ID: {}", person.getIdPerson());
//            // Asignar rol a la persona
//
//            RoleHasPersonEntity roleHasPerson = new RoleHasPersonEntity();
//
//            roleHasPerson.setPersonIdPerson(person);
//            roleHasPerson.setRolesIdRole(studentRole);
//            roleHasPerson.setStatus(1); // Asumiendo que 1 es el estado 'activo'
//            roleHasPersonDao.save(roleHasPerson);
//            roleHasPerson = roleHasPersonDao.save(roleHasPerson);
//            log.info("Rol 'ESTUDIANTE' asignado con éxito a la persona con ID: {}", person.getIdPerson());
//            // Crear perfil de grado con estado 'Rechazado' (usamos NULL para representar 'Rechazado')
//
//
//            // Verificar que roleHasPerson no es nulo y está persistido
//            if (roleHasPerson == null || roleHasPerson.getIdRolePer() == null) {
//                throw new IllegalStateException("roleHasPerson no se ha guardado correctamente");
//            }
//
//
//            log.info("Creando perfil de grado para la persona con ID: {}", person.getIdPerson());
//            GradeProfileEntity gradeProfile = new GradeProfileEntity();
//            gradeProfile.setRoleHasPerson(roleHasPerson);
//            gradeProfile.setName("Perfil " + person.getName());
//            gradeProfile.setStatusProfile(null); // NULL para estado 'Rechazado'
//            gradeProfile.setStatus(0); // Establecer un estado por defecto de no activo de grade profile
//            gradeProfile = gradeProfileDao.save(gradeProfile);
//            log.info("Perfil de grado creado con éxito para la persona con ID: {}", person.getIdPerson());
//
//
//            // Para cada archivo PDF, creamos un registro en 'drives'
//            // Crear y guardar las entidades Drives con las URL proporcionadas
//            log.info("Guardando documentos en Drives para la persona con ID: {}", person.getIdPerson());
//            for (String pdfUrl : request.getPdfDriveUrls()) {
//                DrivesEntity drive = new DrivesEntity();
//                drive.setLinkdriveLetter(pdfUrl); // Guardar la URL del Drive
//                drive.setStatusProfile(0); // Estado 'Sin revisar' representado por 0
//                drive.setUploadedAt(LocalDateTime.now()); // Asignar la fecha y hora de carga actual
//                drive.setCheckedAt(LocalDateTime.now()); // Asignar la fecha y hora de revisión actual
//                drive.setGradeProfileIdGradePro(gradeProfile.getIdGradePro());
//                drivesDao.save(drive);
//                log.info("Documento guardado en Drive con URL: {}", pdfUrl);
//            }
//            log.info("Registro de estudiante y documentos completado con éxito para la persona con ID: {}", person.getIdPerson());
//            // Retornamos una respuesta exitosa con la entidad 'person' creada
//            return new SuccessfulResponse("200", "Registro completado con éxito", person);
//        } catch (Exception e) {
//            // En caso de error, retornamos una respuesta de fallo
//            log.error("Error al registrar estudiante y documentos", e);
//            return new UnsuccessfulResponse("500", "Error al realizar el registro", e.getMessage());
//        }
//    }
//
//
//
//
//}
