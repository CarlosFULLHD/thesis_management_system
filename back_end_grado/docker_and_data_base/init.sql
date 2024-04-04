
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

-- Table: Drives
CREATE TABLE IF NOT EXISTS Drives (
    id_drives serial NOT NULL,
    linkdrive_letter VARCHAR(75) NOT NULL,
    status_profile smallint,
    uploaded_at TIMESTAMP NOT NULL,  -- TIMESTAMP en lugar de DateTime
    checked_at TIMESTAMP NOT NULL,  -- TIMESTAMP en lugar de DateTime
    grade_profile_id_grade_pro int NOT NULL,
    CONSTRAINT Drives_pk PRIMARY KEY (id_drives)
);

-- Table: grade_profile
CREATE TABLE IF NOT EXISTS grade_profile (
    id_grade_pro serial NOT NULL,
    role_has_person_id_role_per int NOT NULL,
    name varchar(150) NOT NULL,
    url VARCHAR(75) ,  -- puede ser null
    status_profile smallint,  -- Estado por defecto NULL, cuando tenga estado mostrarlo al estudiante
    observations varchar(300),  -- Puede ser null
    status smallint NOT NULL,
    created_at TIMESTAMP NOT NULL,  -- TIMESTAMP en lugar de int
    CONSTRAINT grade_profile_pk PRIMARY KEY (id_grade_pro)
);

CREATE TABLE IF NOT EXISTS application (
    id_application serial  NOT NULL,
    role_has_person_id_role_per int  NOT NULL,
    grade_profile_id_grade_pro int  NOT NULL,
    status_application smallint  NOT NULL,
    status smallint  NOT NULL,
    created_at TIMESTAMP  NOT NULL,
    CONSTRAINT application_pk PRIMARY KEY (id_application)
);

-- lecturer_application entity
CREATE TABLE IF NOT EXISTS lecturer_application (
    id_tutor_application SERIAL PRIMARY KEY,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    grade_profile_id_grade_pro INT REFERENCES grade_profile(id_grade_pro) ON DELETE CASCADE,
    is_accepted SMALLINT NOT NULL,
    tutor_or_lecturer SMALLINT NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
    );


INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES (
           '123456',
           'OSWALDO',
           'FIGUEROA',
           'FIGUEROA',
           'COORDINADOR TALLER DE GRADO 1 Y 2',
           'oswaldo@figueroa.com',
           '77889966',
           1,
           CURRENT_TIMESTAMP
       );

INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES (
           '654321',
           'ESTUDIANTE',
           'UCB',
           'LA PAZ',
           'ESTUDIANTE TALLER DE GRADO 1 Y 2',
           'estudiante@ucb.lapaz.com',
           '74185296',
           1,
           CURRENT_TIMESTAMP
       );

INSERT INTO person (ci,name,father_last_name,mother_last_name,description,email,cellphone,status,created_at)
VALUES
    (33952155,'Tarik','Berry','Pearson','eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis','tarik.berry@ucb.edu.bo','5265556',0,'2024-03-24 06:12:26'),
    (12108939,'Danielle','Santos','Herrera','eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla','danielle.santos@ucb.edu.bo','6936161',0,'2024-03-04 18:35:44'),
    (11931366,'Tanek','Gomez','Combs','mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie','tanek.gomez@ucb.edu.bo','2698211',0,'2024-03-12 15:29:38'),
    (9022685,'Allistair','Cannon','Griffith','neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin','allistair.cannon@ucb.edu.bo','0327141',1,'2024-03-07 23:40:50'),
    (87812260,'Indigo','Burgess','Swanson','enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris','indigo.burguess@ucb.edu.bo','7369290',0,'2024-03-24 03:33:01'),
    (56258577,'Derek','Weiss','Holt','semper pretium neque. Morbi quis urna. Nunc quis arcu vel','derek.weiss@ucb.edu.bo','4134731',1,'2024-03-21 02:30:45'),
    (79123067,'Brianna','Chan','Dickson','ante lectus convallis est, vitae sodales nisi magna sed dui.','briana.chan@ucb.edu.bo','1728823',1,'2024-03-19 02:15:21');

INSERT INTO roles (user_role, status,created_at)
VALUES (
           'COORDINADOR',
           1,
           CURRENT_TIMESTAMP
       );

INSERT INTO roles (user_role, status,created_at)
VALUES (
           'ESTUDIANTE',
           1,
           CURRENT_TIMESTAMP
       );

INSERT INTO roles (user_role, status,created_at)
VALUES (
           'DOCENTE',
           1,
           CURRENT_TIMESTAMP
       );

INSERT INTO role_has_person ( roles_id_role, person_id_person, status, created_at)
VALUES (
        1,
        1,
        1,
        CURRENT_TIMESTAMP
       );

INSERT INTO role_has_person ( roles_id_role, person_id_person, status, created_at)
VALUES (
           2,
           2,
           1,
           CURRENT_TIMESTAMP
       );