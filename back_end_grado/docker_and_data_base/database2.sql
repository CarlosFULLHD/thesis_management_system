
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
                                      linkdrive_letter bytea,  -- Cambiado a bytea para almacenar PDF
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
    url bytea,  -- Cambiado a bytea y puede ser null
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

-- Insert roles
INSERT INTO roles (user_role, status, created_at) VALUES ('ESTUDIANTE', 1, CURRENT_TIMESTAMP);
INSERT INTO roles (user_role, status, created_at) VALUES ('DOCENTE', 1, CURRENT_TIMESTAMP);
INSERT INTO roles (user_role, status, created_at) VALUES ('COORDINADOR', 1, CURRENT_TIMESTAMP);
INSERT INTO roles (user_role, status, created_at) VALUES ('PERSONA', 1, CURRENT_TIMESTAMP);
-- Insert persons
INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES ('12345678', 'John', 'Doe', 'Smith', 'A student', 'john.doe@ucb.edu.bo', '123456789', 1, CURRENT_TIMESTAMP);
INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES ('77777777', 'Charles', 'Raskolnikov', 'Putin', 'Soy ingeniero de Sistemas', 'chales.raskolnikov@ucb.edu.bo', '798465463', 1, CURRENT_TIMESTAMP);
INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES ('99999999', 'Orlando', 'Rivera', 'Jurado', 'Director de Carrera', 'o.rivera@ucb.edu.bo', '798798798', 1, CURRENT_TIMESTAMP);
INSERT INTO person (ci, name, father_last_name, mother_last_name, description, email, cellphone, status, created_at)
VALUES ('11111111', 'Cristian', 'Ronaldo', 'Rojas', 'Persona promedio que llena formulario', 'cristian.ronaldo@ucb.edu.bo', '799999999', 1, CURRENT_TIMESTAMP);

-- Insert role_has_person
INSERT INTO role_has_person (roles_id_role, person_id_person, status, created_at) VALUES (1, 1, 1, CURRENT_TIMESTAMP);
INSERT INTO role_has_person (roles_id_role, person_id_person, status, created_at) VALUES (2, 2, 1, CURRENT_TIMESTAMP);
INSERT INTO role_has_person (roles_id_role, person_id_person, status, created_at) VALUES (3, 3, 1, CURRENT_TIMESTAMP);
INSERT INTO role_has_person (roles_id_role, person_id_person, status, created_at) VALUES (4, 4, 1, CURRENT_TIMESTAMP);

-- Insert grade_profile
INSERT INTO grade_profile (role_has_person_id_role_per, name, status_profile, status, created_at)
VALUES (1, 'Grade Profile John', 4, 1, CURRENT_TIMESTAMP);

-- Insert Drives (PDF no se puede insertar directamente con un SQL query, debería hacerse a través de una aplicación)
INSERT INTO Drives (linkdrive_letter, status_profile, uploaded_at, checked_at, grade_profile_id_grade_pro)
VALUES ('\x', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);  -- \x es un placeholder para datos binarios

