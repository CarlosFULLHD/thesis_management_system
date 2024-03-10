
-- Roles entity
CREATE TABLE IF NOT EXISTS roles (
    id_role SERIAL PRIMARY KEY,
    user_role VARCHAR(75) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Person entity
CREATE TABLE IF NOT EXISTS person (
    id_person SERIAL PRIMARY KEY,
    ci VARCHAR(75) NOT NULL,
    name VARCHAR(75) NOT NULL,
    father_last_name VARCHAR(75),
    mother_last_name VARCHAR(75),
    description VARCHAR(300),
    email VARCHAR(150) NOT NULL,
    cellphone VARCHAR(75) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- role_has_person entity
CREATE TABLE IF NOT EXISTS role_has_person(
    id_role_per SERIAL PRIMARY KEY,
    roles_id_role INT REFERENCES roles(id_role) ON DELETE CASCADE,
    person_id_person INT REFERENCES person(id_person) ON DELETE CASCADE,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- public_information entity
CREATE TABLE IF NOT EXISTS public_information(
    id_public_info SERIAL PRIMARY KEY,
    person_id_person INT REFERENCES person(id_person) ON DELETE CASCADE,
    information VARCHAR(200) NOT NULL,
    status SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);