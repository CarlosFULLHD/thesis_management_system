-- Table: roles
CREATE TABLE roles (
id_role serial  NOT NULL,
user_role varchar(75)  NOT NULL,
status smallint  NOT NULL,
created_at DateTime  NOT NULL,
CONSTRAINT roles_pk PRIMARY KEY (id_role)
);

-- Table: person
CREATE TABLE person (
id_person serial  NOT NULL,
ci varchar(75)  NOT NULL,
name varchar(75)  NOT NULL,
father_last_name varchar(75)  NOT NULL,
mother_last_name varchar(75)  NOT NULL,
description varchar(300)  NOT NULL,
email varchar(150)  NOT NULL,
cellphone varchar(75)  NOT NULL,
status smallint  NOT NULL,
created_at DateTime  NOT NULL,
CONSTRAINT person_pk PRIMARY KEY (id_person)
);

-- Table: users
CREATE TABLE users (
id_users int  NOT NULL,
person_id_person int  NOT NULL,
username varchar(30)  NOT NULL,
password varchar(75)  NOT NULL,
salt varchar(12)  NOT NULL,
status smallint  NOT NULL,
created_at datetime  NOT NULL,
CONSTRAINT users_pk PRIMARY KEY (id_users),
CONSTRAINT users_person_fk FOREIGN KEY (person_id_person)
REFERENCES person (id_person)
);

-- Table: role_has_person
CREATE TABLE role_has_person (
id_role_per serial  NOT NULL,
roles_id_role int  NOT NULL,
users_id_users int  NOT NULL,
status smallint  NOT NULL,
created_at DateTime  NOT NULL,
CONSTRAINT role_has_person_pk PRIMARY KEY (id_role_per),
CONSTRAINT role_has_person_roles_fk FOREIGN KEY (roles_id_role)
 REFERENCES roles (id_role),
CONSTRAINT role_has_person_users_fk FOREIGN KEY (users_id_users)
 REFERENCES users (id_users)
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
INSERT INTO users (person_id_person, username, password, salt, status, created_at)
VALUES
    (1, 'oswaldofigueroa', 'password123', 'somesalt', 1, CURRENT_TIMESTAMP),
    (2, 'estudianteucb', 'password123', 'somesalt', 1, CURRENT_TIMESTAMP);


-- Suponiendo que `id_users` para 'oswaldofigueroa' y 'estudianteucb' son 1 y 2 respectivamente
-- y que los `id_role` para 'COORDINADOR' y 'ESTUDIANTE' son 1 y 2 respectivamente

INSERT INTO role_has_person (roles_id_role, users_id_users, status, created_at)
VALUES
    (1, 1, 1, CURRENT_TIMESTAMP), -- Asigna 'COORDINADOR' a 'oswaldofigueroa'
    (2, 2, 1, CURRENT_TIMESTAMP); -- Asigna 'ESTUDIANTE' a 'estudianteucb'
