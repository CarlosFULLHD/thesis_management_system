
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

-- role_has_person entity
CREATE TABLE IF NOT EXISTS role_has_person(
    id_role_per SERIAL PRIMARY KEY,
    roles_id_role INT REFERENCES roles(id_role) ON DELETE CASCADE,
    person_id_person INT REFERENCES person(id_person) ON DELETE CASCADE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- public_information entity
CREATE TABLE IF NOT EXISTS public_information(
    id_public_info SERIAL PRIMARY KEY,
    role_has_person_id_role_per INT REFERENCES role_has_person(id_role_per) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL UNIQUE,
    information VARCHAR(2000) NOT NULL,
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