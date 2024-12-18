-- Roles entity
CREATE TABLE IF NOT EXISTS roles (
    id_role SERIAL PRIMARY KEY,
    user_role VARCHAR(75) NOT NULL UNIQUE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Person entity
CREATE TABLE IF NOT EXISTS person (
    id_person SERIAL PRIMARY KEY,
    ci VARCHAR(75) NOT NULL UNIQUE,
    name VARCHAR(75) NOT NULL,
    father_last_name VARCHAR(75),
    mother_last_name VARCHAR(75),
    description VARCHAR(2000),
    email VARCHAR(150) NOT NULL UNIQUE,
    cellphone VARCHAR(75) NOT NULL UNIQUE,
    status SMALLINT NOT NULL,
    image_url varchar(300),
    created_at TIMESTAMP NOT NULL
    );

-- user entity
CREATE TABLE IF NOT EXISTS users(
    id_users SERIAL PRIMARY KEY,
    person_id_person INT UNIQUE REFERENCES person(id_person) ON DELETE CASCADE,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(4000) NOT NULL,
    salt VARCHAR(4000) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- permissions entity
CREATE TABLE IF NOT EXISTS permissions(
    id_permission SERIAL PRIMARY KEY,
    permission VARCHAR(75) UNIQUE NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- role_has_permission entity
CREATE TABLE IF NOT EXISTS role_has_permission(
    id_role_per SERIAL PRIMARY KEY,
    permission_id_permission INT REFERENCES permissions(id_permission) ON DELETE CASCADE,
    roles_id_role INT REFERENCES roles(id_role) ON DELETE CASCADE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- role_has_person entity
CREATE TABLE IF NOT EXISTS role_has_person(
    id_role_per SERIAL PRIMARY KEY,
    roles_id_role INT REFERENCES roles(id_role) ON DELETE CASCADE,
    users_id_users INT UNIQUE REFERENCES users(id_users) ON DELETE CASCADE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- public_information entity
CREATE TABLE IF NOT EXISTS public_information(
    id_public_info SERIAL PRIMARY KEY,
    users_id_users INT REFERENCES users(id_users) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL UNIQUE,
    information VARCHAR(2000) NOT NULL,
    publication_date TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- temporal_code entity
CREATE TABLE IF NOT EXISTS temporal_code (
    id_temporal SERIAL PRIMARY KEY,
    temporal_code VARCHAR(35) NOT NULL UNIQUE,
    send_it_to VARCHAR(150) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    due_date TIMESTAMP NOT NULL,
    is_used SMALLINT NOT NULL
    );

-- Desertion entity
CREATE TABLE IF NOT EXISTS desertion (
    id_desertion SERIAL PRIMARY KEY,
    users_id_users INT REFERENCES users(id_users) ON DELETE CASCADE,
    reason VARCHAR(300) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Table: grade_profile
CREATE TABLE IF NOT EXISTS grade_profile (
    id_grade_pro serial NOT NULL,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    status_graduation_mode SMALLINT NOT NULL,
    is_gradeoneortwo SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT grade_profile_pk PRIMARY KEY (id_grade_pro)
    );

-- lecturer_application entity
CREATE TABLE IF NOT EXISTS lecturer_application (
    id_tutor_application SERIAL PRIMARY KEY,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    grade_profile_id_grade_pro INT REFERENCES grade_profile(id_grade_pro) ON DELETE CASCADE,
    is_accepted SMALLINT NOT NULL,
    tutorLecturer SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Task states entity
CREATE TABLE IF NOT EXISTS task_states (
    id_task_state SERIAL PRIMARY KEY,
    description VARCHAR(35) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- academic_period entity
CREATE TABLE IF NOT EXISTS academic_period(
    id_acad SERIAL PRIMARY KEY,
    semester VARCHAR(35) NOT NULL,
    init_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    account_until TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Subjects entity
CREATE TABLE IF NOT EXISTS subjects (
    id_subject SERIAL PRIMARY KEY,
    subject_name VARCHAR(150) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Teacher_has_subject entity
CREATE TABLE IF NOT EXISTS teacher_has_subject(
    id_per_sub SERIAL NOT NULL PRIMARY KEY,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    subjects_id_subject INT REFERENCES subjects(id_subject) ON DELETE CASCADE,
    comments VARCHAR(300) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Social_network entity
CREATE TABLE IF NOT EXISTS social_network (
    id_social SERIAL PRIMARY KEY,
    person_id_person INT REFERENCES person(id_person) ON DELETE CASCADE,
    url_linkedin VARCHAR(300) NOT NULL,
    icon VARCHAR(300) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );

-- Create milestone entity
CREATE TABLE IF NOT EXISTS milestone(
    id_milestone SERIAL NOT NULL PRIMARY KEY,
    task_states_id_task_state INT REFERENCES task_states(id_task_state) ON DELETE CASCADE,
    users_id_users INT REFERENCES users(id_users) ON DELETE CASCADE,
    comments VARCHAR(600) NOT NULL,
    url VARCHAR(600) NOT NULL,
    plp_involved VARCHAR(600) NOT NULL,
    is_student_or_coordinator SMALLINT NOT NULL,
    is_send SMALLINT NOT NULL,
    meeting_date TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create academic_has_grade_profile
CREATE TABLE IF NOT EXISTS academic_has_grade_profile (
    id_acad_grade SERIAL NOT NULL PRIMARY KEY,
    grade_profile_id_grade_pro INT REFERENCES grade_profile(id_grade_pro) ON DELETE CASCADE,
    academic_period_id_acad INT REFERENCES academic_period(id_acad) ON DELETE CASCADE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create grade_profile_has_task
CREATE TABLE IF NOT EXISTS grade_profile_has_task (
    id_task SERIAL NOT NULL PRIMARY KEY,
    task_states_id_task_state INT REFERENCES task_states(id_task_state) ON DELETE CASCADE,
    academic_has_grade_profile_id_acad_grade INT REFERENCES academic_has_grade_profile(id_acad_grade) ON DELETE CASCADE,
    title_task VARCHAR(100) NOT NULL,
    task VARCHAR(500) NOT NULL,
    feedback VARCHAR(500) NOT NULL,
    order_is INT NOT NULL,
    is_url SMALLINT NOT NULL,
    is_meeting SMALLINT NOT NULL,
    is_student_or_tutor SMALLINT NOT NULL,
    publication_date TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create meeting
CREATE TABLE IF NOT EXISTS meeting (
    id_meeting SERIAL NOT NULL PRIMARY KEY,
    grade_profile_has_task_id_task INT UNIQUE REFERENCES grade_profile_has_task(id_task) ON DELETE CASCADE,
    address_link VARCHAR(300) NOT NULL,
    is_virtual SMALLINT NOT NULL,
    meeting_date TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create urls
CREATE TABLE IF NOT EXISTS urls(
    id_urls SERIAL NOT NULL PRIMARY KEY,
    grade_profile_has_task_id_task INT UNIQUE REFERENCES grade_profile_has_task(id_task) ON DELETE CASCADE,
    url VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create formal_defense
CREATE TABLE IF NOT EXISTS formal_defense(
    id_formal SERIAL NOT NULL PRIMARY KEY,
    task_states_id_task_state INT REFERENCES task_states(id_task_state) ON DELETE CASCADE,
    academic_has_grade_profile_id_acad_grade INT REFERENCES academic_has_grade_profile(id_acad_grade) ON DELETE CASCADE,
    feedback VARCHAR(600) NOT NULL,
    url VARCHAR(300) NOT NULL,
    formal_act VARCHAR(300) NOT NULL,
    plp_involved VARCHAR(600) NOT NULL,
    defense_date TIMESTAMP NOT NULL,
    place VARCHAR(300),
    grade DECIMAL(10,5) NOT NULL,
    is_student_or_lecturer INT NOT NULL,
    is_gradeoneortwo INT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS wait_list (
    id_wait SERIAL PRIMARY KEY,
    formal_defense_id_formal INT UNIQUE REFERENCES formal_defense(id_formal) ON DELETE CASCADE,
    id_grado INT NOT NULL,
    id_users INT NOT NULL,
    waitlist_for_what INT NOT NULL,
    grade DECIMAL(10,5) NOT NULL,
    feedback VARCHAR(600) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, image_url, status, created_at)
VALUES
    ('123456', 'OSWALDO', 'FIGUEROA', 'FIGUEROA', 'COORDINADOR TALLER DE GRADO 1 Y 2', 'oswaldo@figueroa.com', '77889966', 'https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=h5c8OJcQy3zF9J0iUVKMYfANgEaG7gAyHDe03usP0AE=', 1, CURRENT_TIMESTAMP),
    ('654321', 'ESTUDIANTE', 'UCB', 'LA PAZ', 'ESTUDIANTE TALLER DE GRADO 1 Y 2', 'estudiante@ucb.lapaz.com', '74185296', 'https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=h5c8OJcQy3zF9J0iUVKMYfANgEaG7gAyHDe03usP0AE=', 1, CURRENT_TIMESTAMP),
    ('879465', 'DOCENTE', 'UCB', 'LA PAZ', 'DOCENTE', 'docente@ucb.edu.bo', '78451323', 'https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=h5c8OJcQy3zF9J0iUVKMYfANgEaG7gAyHDe03usP0AE=', 1, CURRENT_TIMESTAMP),
    ('33952155','Tarik','Berry','Pearson','Tengo experiencia el diseñado de software y arquitectura, trabaje con angular y Keycloack en varios proyectos internacionales','tarik.berry@ucb.edu.bo','5265556','https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=h5c8OJcQy3zF9J0iUVKMYfANgEaG7gAyHDe03usP0AE=',1,CURRENT_TIMESTAMP),
    ('12108939','Danielle','Santos','Herrera','eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla','danielle.santos@ucb.edu.bo','6936161','https://media.istockphoto.com/id/1367421610/es/foto/vista-de-un-joven-usando-un-tel%C3%A9fono-inteligente-por-la-noche-con-el-paisaje-de-la-vista-de-la.jpg?s=612x612&w=is&k=20&c=DMhxBug4kVAuNC3bQ8U9QsA2p5_s8HG2n0tNy2WM9fA=',0,CURRENT_TIMESTAMP),
    ('11931366','Tanek','Gomez','Combs','mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie','tanek.gomez@ucb.edu.bo','2698211','https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=h5c8OJcQy3zF9J0iUVKMYfANgEaG7gAyHDe03usP0AE=',0,CURRENT_TIMESTAMP),
    ('9022685','Allistair','Cannon','Griffith','neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin','allistair.cannon@ucb.edu.bo','0327141','https://media.istockphoto.com/id/1438133166/es/foto/hombre-de-negocios-maduro-y-seguro-de-s%C3%AD-mismo-con-los-brazos-cruzados-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=is&k=20&c=rPzhO1V6Mr-9helg1O9XrdaZ2aqqR1DOkN3G3kjr7IY=',1,CURRENT_TIMESTAMP),
    ('87812260','Indigo','Burgess','Swanson','enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris','indigo.burguess@ucb.edu.bo','7369290','https://media.istockphoto.com/id/1438133166/es/foto/hombre-de-negocios-maduro-y-seguro-de-s%C3%AD-mismo-con-los-brazos-cruzados-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=is&k=20&c=rPzhO1V6Mr-9helg1O9XrdaZ2aqqR1DOkN3G3kjr7IY=',0,CURRENT_TIMESTAMP),
    ('56258577','Derek','Weiss','Holt','semper pretium neque. Morbi quis urna. Nunc quis arcu vel','derek.weiss@ucb.edu.bo','4134731','https://media.istockphoto.com/id/1438133166/es/foto/hombre-de-negocios-maduro-y-seguro-de-s%C3%AD-mismo-con-los-brazos-cruzados-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=is&k=20&c=rPzhO1V6Mr-9helg1O9XrdaZ2aqqR1DOkN3G3kjr7IY=',1,CURRENT_TIMESTAMP),
    ('79123067','Brianna','Chan','Dickson','ante lectus convallis est, vitae sodales nisi magna sed dui.','briana.chan@ucb.edu.bo','1728823','https://media.istockphoto.com/id/1438133166/es/foto/hombre-de-negocios-maduro-y-seguro-de-s%C3%AD-mismo-con-los-brazos-cruzados-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=is&k=20&c=rPzhO1V6Mr-9helg1O9XrdaZ2aqqR1DOkN3G3kjr7IY=',1,CURRENT_TIMESTAMP);

INSERT INTO users (person_id_person, username, "password", salt, status, created_at)
VALUES
    (1, 'OSWALDO FIGUEROA', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (2, 'ESTUDIANTE UCB', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (3, 'DOCENTE UCB', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (4, 'Tarik Berry', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP);

INSERT INTO roles (user_role, status,created_at)
VALUES
    ('COORDINADOR', 1, CURRENT_TIMESTAMP),
    ('ESTUDIANTE', 1, CURRENT_TIMESTAMP),
    ('DOCENTE', 1, CURRENT_TIMESTAMP);


INSERT INTO permissions (permission, status, created_at)
VALUES
    ('CREATE',1,CURRENT_TIMESTAMP),
    ('READ',1,CURRENT_TIMESTAMP),
    ('UPDATE',1,CURRENT_TIMESTAMP),
    ('DELETE',1,CURRENT_TIMESTAMP);

INSERT INTO role_has_person (roles_id_role, users_id_users , status, created_at)
VALUES
    (1, 1, 1, CURRENT_TIMESTAMP),
    (2, 2, 1, CURRENT_TIMESTAMP),
    (3, 3, 1, CURRENT_TIMESTAMP),
    (3, 4, 1, CURRENT_TIMESTAMP);

INSERT INTO role_has_permission (permission_id_permission , roles_id_role, status, created_at)
VALUES
    (1, 1, 1, CURRENT_TIMESTAMP),
    (2, 1, 1, CURRENT_TIMESTAMP),
    (3, 1, 1, CURRENT_TIMESTAMP),
    (4, 1, 1, CURRENT_TIMESTAMP),
    (1, 2, 1, CURRENT_TIMESTAMP),
    (2, 2, 1, CURRENT_TIMESTAMP),
    (3, 2, 1, CURRENT_TIMESTAMP),
    (1, 3, 1, CURRENT_TIMESTAMP),
    (2, 3, 1, CURRENT_TIMESTAMP),
    (3, 3, 1, CURRENT_TIMESTAMP),
    (4, 3, 1, CURRENT_TIMESTAMP);

-- INSERT INTO grade_profile (role_has_person_id_role_per, title, status_graduation_mode,is_gradeoneortwo, status, created_at)
-- VALUES
--     (2, 'PRUEBA DE PERFIL', 1, 1,1, CURRENT_TIMESTAMP);
--
-- INSERT INTO lecturer_application (role_has_person_id_role_per, grade_profile_id_grade_pro, is_accepted, tutorlecturer, status, created_at)
-- VALUES
--     (3, 1, 0, 2, 1, CURRENT_TIMESTAMP),
--     (4, 1, 0, 2, 1, CURRENT_TIMESTAMP);

INSERT INTO task_states (description, status, created_at)
VALUES
    ('EN ESPERA', 1, NOW()),
    ('DESAPROBADO', 1, NOW()),
    ('OBSERVADO', 1, NOW()),
    ('APROBADO', 1, NOW()),
    ('ABIERTO', 1, NOW()),
    ('CERRADO', 1, NOW()),
    ('SIN PRESENTAR', 1, NOW()),
    ('PRESENTO TARDE', 1, NOW());


INSERT INTO academic_period (semester, init_date, end_date,account_until, status, created_at) VALUES
    ('II - 2024','2024-07-01 11:11:00','2025-01-31 23:59:59','2025-01-31 23:59:59',1,NOW());

INSERT INTO milestone (task_states_id_task_state, users_id_users, comments, url, plp_involved, is_student_or_coordinator, is_send,meeting_date,status,created_at)
VALUES
    (5,2,'','','',1,-1,NOW(),1,NOW());



INSERT INTO subjects (subject_name, status, created_at)
VALUES
    ('TECNOLOGIAS DE LA INFORMACION', 1, NOW()),
    ('ROBOTICA', 1, NOW()),
    ('OFIMATICA', 1, NOW()),
    ('REALIDAD VIRTUAL', 1, NOW()),
    ('INTELIGENCIA ARTIFICIAL', 1, NOW()),
    ('COMPUTACION', 1, NOW()),
    ('DESARROLLO WEB', 1, NOW()),
    ('DESARROLLO DE SOFTWARE', 1, NOW()),
    ('SEGURIDAD INFORMATICA', 1, NOW()),
    ('BIG DATA', 1, NOW()),
    ('REDES INFORMATICAS', 1, NOW());

INSERT INTO social_network (person_id_person, url_linkedin, icon, status, created_at)
VALUES
    (3, 'http://linkedin.com/in/docenteucb', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (4, 'http://linkedin.com/in/tarikberry', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (9, 'http://linkedin.com/in/derekweiss', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (10, 'http://linkedin.com/in/briannachan', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP);

INSERT INTO teacher_has_subject (role_has_person_id_role_per, subjects_id_subject, comments, status, created_at)
VALUES
    (3, 4, 'Teaching advanced computer science topics.', 1, NOW()),
    (4, 1, 'Focus on algebra and calculus.', 1, NOW()),
    (3, 3, 'General biology and lab works.', 1, NOW());

-- Adding new tutors to the `person` table
INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, image_url, status, created_at)
VALUES
    ('65498731', 'Eduardo', 'Ramirez', 'Sanchez', 'Tutor en tecnologias avanzadas.', 'eduardo.ramirez@ucb.edu.bo', '45612378', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/Ferreira-Julio.png', 1, CURRENT_TIMESTAMP),
    ('78965412', 'Mariana', 'Torres', 'Gomez', 'Experta en robotica aplicada.', 'mariana.torres@ucb.edu.bo', '78965412', 'https://www.ucb.edu.bo/wp-content/uploads/2020/07/Espinar-Saavedra-Andrea-Gabriela.png', 1, CURRENT_TIMESTAMP),
    ('11223344', 'Carlos', 'Martinez', 'Lopez', 'Especialista en big data.', 'carlos.martinez@ucb.edu.bo', '33221100', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/Mercado-Roca-Luis-Adolfo.png', 1, CURRENT_TIMESTAMP),
    ('55667788', 'Ana', 'Garcia', 'Fernandez', 'Experta en inteligencia artificial.', 'ana.garcia@ucb.edu.bo', '55667788', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/Carranza-Paola.png', 1, CURRENT_TIMESTAMP),
    ('99887766', 'Luis', 'Perez', 'Diaz', 'Tutor en redes informaticas.', 'luis.perez@ucb.edu.bo', '99887766', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/d%E2%80%99Abzac-Paul.png', 1, CURRENT_TIMESTAMP),
    ('88776655', 'Marta', 'Sanchez', 'Ruiz', 'Docente en desarrollo web.', 'marta.sanchez@ucb.edu.bo', '88776655', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/Gruberg-Caz%C3%B3n-Helga.png', 1, CURRENT_TIMESTAMP),
    ('77665544', 'Jorge', 'Lopez', 'Martinez', 'Especialista en seguridad informatica.', 'jorge.lopez@ucb.edu.bo', '77665544', 'https://www.ucb.edu.bo/wp-content/uploads/2020/07/Clavijo-Quispe-Miguel-%C3%81ngel.png', 1, CURRENT_TIMESTAMP),
    ('66554433', 'Sofia', 'Ramirez', 'Santos', 'Investigadora en robotica avanzada.', 'sofia.ramirez@ucb.edu.bo', '66554433', 'https://www.ucb.edu.bo/wp-content/uploads/2020/08/Soruco-Rodr%C3%ADguez-Doris-Roxana.png', 1, CURRENT_TIMESTAMP),
    ('55443322', 'Miguel', 'Hernandez', 'Ortiz', 'Experto en realidad virtual.', 'miguel.hernandez@ucb.edu.bo', '55443322', 'https://www.ucb.edu.bo/wp-content/uploads/2020/07/Zuleta-Inch-Oscar-Fabrizio.png', 1, CURRENT_TIMESTAMP),
    ('44332211', 'Laura', 'Gonzalez', 'Vega', 'Profesora en ofimatica y computacion.', 'laura.gonzalez@ucb.edu.bo', '44332211', 'https://www.ucb.edu.bo/wp-content/uploads/2020/07/IMG_20211123_092811-modified.png', 1, CURRENT_TIMESTAMP);

-- Adding new tutors to the `users` table
INSERT INTO users (person_id_person, username, "password", salt, status, created_at)
VALUES
    (11, 'Eduardo Ramirez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (12, 'Mariana Torres', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (13, 'Carlos Martinez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (14, 'Ana Garcia', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (15, 'Luis Perez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (16, 'Marta Sanchez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (17, 'Jorge Lopez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (18, 'Sofia Ramirez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (19, 'Miguel Hernandez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP),
    (20, 'Laura Gonzalez', '$2a$12$xsQ.iBPquwfqNsitk15T7e6haR6d61FMLEKSWVHl1wUinEgS4NBGG', 'secret', 1, CURRENT_TIMESTAMP);

-- Adding roles for the new tutors in `role_has_person`
INSERT INTO role_has_person (roles_id_role, users_id_users , status, created_at)
VALUES
    (3, 5, 1, CURRENT_TIMESTAMP),
    (3, 6, 1, CURRENT_TIMESTAMP),
    (3, 7, 1, CURRENT_TIMESTAMP),
    (3, 8, 1, CURRENT_TIMESTAMP),
    (3, 9, 1, CURRENT_TIMESTAMP),
    (3, 10, 1, CURRENT_TIMESTAMP),
    (3, 11, 1, CURRENT_TIMESTAMP),
    (3, 12, 1, CURRENT_TIMESTAMP),
    (3, 13, 1, CURRENT_TIMESTAMP),
    (3, 14, 1, CURRENT_TIMESTAMP);

-- Adding new entries in `teacher_has_subject` for tutors and their subjects
INSERT INTO teacher_has_subject (role_has_person_id_role_per, subjects_id_subject, comments, status, created_at)
VALUES
    (5, 2, 'Teaching robotics fundamentals and applications.', 1, CURRENT_TIMESTAMP),
    (5, 6, 'Focus on modern computing systems.', 1, CURRENT_TIMESTAMP),
    (6, 8, 'Specialized in software development methodologies.', 1, CURRENT_TIMESTAMP),
    (6, 9, 'Teaching cybersecurity principles.', 1, CURRENT_TIMESTAMP),
    (7, 10, 'Specialized in big data.', 1, CURRENT_TIMESTAMP),
    (8, 5, 'Teaching AI concepts and projects.', 1, CURRENT_TIMESTAMP),
    (9, 11, 'Focus on network administration.', 1, CURRENT_TIMESTAMP),
    (10, 7, 'Advanced web development practices.', 1, CURRENT_TIMESTAMP),
    (11, 9, 'Specialized in cybersecurity training.', 1, CURRENT_TIMESTAMP),
    (12, 3, 'Introduction to office automation and computing.', 1, CURRENT_TIMESTAMP);

-- Adding LinkedIn profiles for the new tutors
INSERT INTO social_network (person_id_person, url_linkedin, icon, status, created_at)
VALUES
    (11, 'http://linkedin.com/in/eduardoramirez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (12, 'http://linkedin.com/in/marianatorres', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (13, 'http://linkedin.com/in/carlosmartinez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (14, 'http://linkedin.com/in/anagarcia', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (15, 'http://linkedin.com/in/luisperez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (16, 'http://linkedin.com/in/martasanchez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (17, 'http://linkedin.com/in/jorgelopez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (18, 'http://linkedin.com/in/sofiaramirez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (19, 'http://linkedin.com/in/miguelhernandez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP),
    (20, 'http://linkedin.com/in/lauragonzalez', 'https://cdn-icons-png.flaticon.com/256/174/174857.png', 1, CURRENT_TIMESTAMP);
