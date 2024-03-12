
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