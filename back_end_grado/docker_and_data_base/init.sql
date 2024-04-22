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

-- Task entity
CREATE TABLE IF NOT EXISTS task (
    id_task SERIAL PRIMARY KEY,
    title_task VARCHAR(100) NOT NULL,
    task VARCHAR(500) NOT NULL,
    is_gradeoneortwo SMALLINT NOT NULL,
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

-- task_has_date entity
CREATE TABLE IF NOT EXISTS task_has_date(
    id_task_date SERIAL PRIMARY KEY,
    task_id_task INT REFERENCES task(id_task) ON DELETE CASCADE,
    academic_period_id_acad INT REFERENCES academic_period(id_acad) ON DELETE CASCADE,
    publication_date TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    order_is INT NOT NULL,
    is_url SMALLINT NOT NULL,
    is_meeting SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Grade_profile_has_task entity
CREATE TABLE IF NOT EXISTS grade_profile_has_task (
    id_grade_task SERIAL PRIMARY KEY,
    task_states_id_task_state INT REFERENCES task_states(id_task_state) ON DELETE CASCADE,
    task_has_date_id_task_date INT REFERENCES task_has_date(id_task_date) ON DELETE CASCADE,
    grade_profile_id_grade_pro INT REFERENCES grade_profile(id_grade_pro) ON DELETE CASCADE,
    comments VARCHAR(400) NOT NULL,
    is_task_done SMALLINT NOT NULL,
    is_task_current SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Table: urls
CREATE TABLE IF NOT EXISTS urls (
    id_urls SERIAL NOT NULL PRIMARY KEY,
    grade_profile_has_task_id_grade_task INT REFERENCES grade_profile_has_task(id_grade_task) ON DELETE CASCADE,
    task_has_date_id_task_date INT REFERENCES task_has_date(id_task_date) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Meeting entity
CREATE TABLE IF NOT EXISTS meeting(
    id_meeting SERIAL NOT NULL PRIMARY KEY,
    grade_profile_has_task_id_grade_task INT REFERENCES grade_profile_has_task(id_grade_task) ON DELETE CASCADE,
    address_link VARCHAR(300) NOT NULL,
    is_virtual SMALLINT NOT NULL,
    meeting_date TIMESTAMP NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Meeting_has_people entity
CREATE TABLE IF NOT EXISTS meeting_has_people(
    id_people SERIAL NOT NULL PRIMARY KEY,
    meeting_id_meeting INT REFERENCES meeting(id_meeting) ON DELETE CASCADE,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    is_done SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Meeting_has_observations entity
CREATE TABLE IF NOT EXISTS meeting_has_observations(
    id_obs SERIAL NOT NULL PRIMARY KEY,
    meeting_has_people_id_people INT REFERENCES meeting_has_people(id_people) ON DELETE CASCADE,
    observation VARCHAR(2000) NOT NULL,
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
CREATE TABLE IF NOT EXISTS teacher_has_subject (
    id_per_sub SERIAL PRIMARY KEY,
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
    icon VARCHAR(75) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );


INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, image_url, status, created_at)
VALUES
    ('123456', 'OSWALDO', 'FIGUEROA', 'FIGUEROA', 'COORDINADOR TALLER DE GRADO 1 Y 2', 'oswaldo@figueroa.com', '77889966', 'https://example.com/images/oswaldo.jpg', 1, CURRENT_TIMESTAMP),
    ('654321', 'ESTUDIANTE', 'UCB', 'LA PAZ', 'ESTUDIANTE TALLER DE GRADO 1 Y 2', 'estudiante@ucb.lapaz.com', '74185296', 'https://example.com/images/estudiante.jpg', 1, CURRENT_TIMESTAMP),
    ('879465', 'DOCENTE', 'UCB', 'LA PAZ', 'DOCENTE', 'docente@ucb.edu.bo', '78451323', 'https://example.com/images/docente.jpg', 1, CURRENT_TIMESTAMP),
    ('33952155','Tarik','Berry','Pearson','eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis','tarik.berry@ucb.edu.bo','5265556','https://example.com/images/tarik.jpg',1,CURRENT_TIMESTAMP),
    ('12108939','Danielle','Santos','Herrera','eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla','danielle.santos@ucb.edu.bo','6936161','https://example.com/images/danielle.jpg',0,CURRENT_TIMESTAMP),
    ('11931366','Tanek','Gomez','Combs','mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie','tanek.gomez@ucb.edu.bo','2698211','https://example.com/images/tanek.jpg',0,CURRENT_TIMESTAMP),
    ('9022685','Allistair','Cannon','Griffith','neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin','allistair.cannon@ucb.edu.bo','0327141','https://example.com/images/allistair.jpg',1,CURRENT_TIMESTAMP),
    ('87812260','Indigo','Burgess','Swanson','enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris','indigo.burguess@ucb.edu.bo','7369290','https://example.com/images/indigo.jpg',0,CURRENT_TIMESTAMP),
    ('56258577','Derek','Weiss','Holt','semper pretium neque. Morbi quis urna. Nunc quis arcu vel','derek.weiss@ucb.edu.bo','4134731','https://example.com/images/derek.jpg',1,CURRENT_TIMESTAMP),
    ('79123067','Brianna','Chan','Dickson','ante lectus convallis est, vitae sodales nisi magna sed dui.','briana.chan@ucb.edu.bo','1728823','https://example.com/images/brianna.jpg',1,CURRENT_TIMESTAMP);

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

INSERT INTO grade_profile (role_has_person_id_role_per, title, status_graduation_mode,  status, created_at)
VALUES
    (2, 'PRUEBA DE PERFIL', 1, 1, CURRENT_TIMESTAMP);

INSERT INTO lecturer_application (role_has_person_id_role_per, grade_profile_id_grade_pro, is_accepted, tutorlecturer, status, created_at)
VALUES
    (3, 1, 0, 2, 1, CURRENT_TIMESTAMP),
    (4, 1, 0, 2, 1, CURRENT_TIMESTAMP);

INSERT INTO task_states (description, status, created_at)
VALUES
    ('ABIERTO', 1, NOW()),
    ('EN ESPERA', 1, NOW()),
    ('APROBADO', 1, NOW()),
    ('APROBADO CON OBS', 1, NOW()),
    ('DESAPROBADO', 1, NOW()),
    ('SIN PRESENTAR', 1, NOW());




INSERT INTO task (title_task, task, is_gradeoneortwo, status, created_at)
VALUES
    ('CAMBIAR CONTRASEÑA', 'CAMBIA TU CONTRASEÑA GENERADA AUTOMÁTICAMENTE', 1, 1, NOW()),
    ('PRESENTAR CARTA', 'SUBIR UN RESPALDO DE LA CARTA DE PRESENTACIÓN DE PERFIL DE GRADO APROBADA', 1, 1, NOW()),
    ('PROCESO DE APROBACIÓN DE PERFIL DE GRADO', 'PRESENTAR PERFIL DE GRADO PARA APROBACIÓN DE CONSEJO EVALUADOR', 1, 1, NOW()),
    ('DEFINIR FORMA DE GRADUACIÓN', 'EN BASE A LA CARTA ACEPTADA Y APROBACIÓN DE PERFIL, DEFINE LA FORMA DE GRADUACIÓN', 1, 1, NOW());

INSERT INTO subjects (subject_name, status, created_at)
VALUES
    ('Tecnologias Web', 1, CURRENT_TIMESTAMP),
    ('Seguridad de Sistemas', 1, CURRENT_TIMESTAMP),
    ('Desarrollo de Software', 1, CURRENT_TIMESTAMP),
    ('Ciencia de Datos', 1, CURRENT_TIMESTAMP);

INSERT INTO social_network (person_id_person, url_linkedin, icon, status, created_at)
VALUES
    (3, 'http://linkedin.com/in/docenteucb', 'linkedin-icon', 1, CURRENT_TIMESTAMP),
    (4, 'http://linkedin.com/in/tarikberry', 'linkedin-icon', 1, CURRENT_TIMESTAMP),
    (9, 'http://linkedin.com/in/derekweiss', 'linkedin-icon', 1, CURRENT_TIMESTAMP),
    (10, 'http://linkedin.com/in/briannachan', 'linkedin-icon', 1, CURRENT_TIMESTAMP);

INSERT INTO teacher_has_subject (role_has_person_id_role_per, subjects_id_subject, comments, status, created_at)
VALUES
    (3, 4, 'Teaching advanced computer science topics.', 1, CURRENT_TIMESTAMP),
    (4, 1, 'Focus on algebra and calculus.', 1, CURRENT_TIMESTAMP),
    (3, 3, 'General biology and lab works.', 1, CURRENT_TIMESTAMP);


