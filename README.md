### Documentación Extensiva del Proyecto: Thesis Management System

Develop an integrated information system prototype for efficiently managing the thesis workshops for Systems Engineering, facilitating the administration of registrations, tutor assignments, proposal reviews, and student progress tracking.

#### Descripción del Proyecto

El sistema permite a los usuarios realizar las siguientes actividades:

1. **Informar y Crear Noticias**: Proporciona información esencial del proceso de talleres de grado junto con documentación oficial. Permite la creación de noticias con cualquier fecha de inicio y límite para informar a los estudiantes sobre cambios o recomendaciones.

2. **Herramienta de Búsqueda en Biblioteca**: Interfaz sencilla para facilitar la búsqueda de proyectos de grado dentro de la carrera. Búsqueda por palabras, autores, temas, junto con un tutorial de uso tanto en el sistema como en la biblioteca.

3. **Gestión de Tutores Disponibles**: Información de tutores disponibles, incluyendo su experiencia y contacto para facilitar la elección de un tutor.

4. **Administrar Inscripciones de los Docentes**: Verificación de acceso de docentes mediante correo y autenticación de doble factor para evitar suplantación de identidad.

5. **Administrar Inscripciones de los Estudiantes**: Formulario de inscripción para que los estudiantes sean revisados por el docente encargado, validando su acceso al sistema. Permite mandar propuestas de proyecto para ser revisadas.

6. **Administrar Abandono y Baja de Estudiantes**: Permite a los estudiantes abandonar la materia de taller de grado y al coordinador darlos de baja o rechazar su solicitud de abandono.

7. **Revisión de Propuestas de Grado**: Interfaces para enviar propuestas de grado para revisión y recibir retroalimentación, facilitando el proceso tanto para el consejo de carrera como para el estudiante.

8. **Asignación de Tutores y Relatores**: Ayuda al coordinador de taller de grado a asignar tutores y relatores a los estudiantes.

9. **Gestión de Tareas, Avance del Estudiante y Reuniones**: Permite llevar a cabo reuniones (virtuales o presenciales) con el tutor. El tutor puede asignar tareas y retroalimentación, y el estudiante puede ver el progreso del proyecto.

10. **Generación del Documento Final para Defensa Formal**: Facilita la generación del documento final para la defensa formal.

11. **Gestión de Usuarios y Baja de Estudiantes**: Permite gestionar usuarios, cambiar roles y dar de baja a estudiantes.

### Problemas y Requerimientos Iniciales

El proyecto fue iniciado con un documento de relevamiento de pocos requerimientos, posteriormente ampliado con requerimientos adicionales obtenidos mediante entrevistas con el director de carrera, coordinador de taller de grado y docentes asociados. Utilizamos JIRA para la gestión de tareas y seguimiento del proyecto.

### Análisis Preliminar

#### Universidad Católica Boliviana “San Pablo” - Titulación

La UCB ofrece nueve modalidades de titulación, con las más comunes en Ingeniería siendo el proyecto de grado, tesis de grado, trabajo dirigido y graduación por excelencia. El proceso de titulación tiene deficiencias en organización, falta de información y comunicación.

### Identificación y Análisis del Problema

**Estudiantes:**

- Comunicación inadecuada entre coordinación de taller y propuestas de temas.
- Falta de guías y formatos adecuados.
- Falta de documentación para respaldar propuestas.
- Desconocimiento de cronograma y disponibilidad de tutores.

**Coordinadores:**

- Desconocimiento del número de estudiantes interesados.
- Comunicación tardía con estudiantes.
- Falta de registro centralizado de propuestas.
- Retrasos en la emisión de resultados de reuniones del consejo de carrera.
- Seguimiento rudimentario a estudiantes (hojas Excel).
- Dificultad en la generación de estadísticas.

### Formulación del Problema

**¿Cómo se puede mejorar la gestión y control de las modalidades de graduación en la carrera de Ingeniería de Sistemas?**

### Objetivos

#### General

Desarrollar un sistema de información enfocado en la gestión de modalidades de titulación para automatizar los procesos necesarios.

#### Específicos

1. Identificar roles necesarios para acceso restringido a información sensible.
2. Desarrollar un módulo para el registro de propuestas y sus requerimientos.
3. Diseñar un módulo para la evaluación de propuestas y documentación por docentes.
4. Generar un cronograma modificable por docentes para la presentación de documentación.
5. Exponer estadísticas sobre estudiantes y modalidades.

### Justificación

#### Práctica

El sistema mejorará la organización de las modalidades de titulación, centralizando la documentación y facilitando la comunicación entre estudiantes, docentes y tutores.

#### Social

Brindará comodidad a los docentes al centralizar la documentación en un único medio y permitirá a los estudiantes visualizar fechas de entregables y recibir retroalimentación eficaz.

### Alcances

1. Plataforma web accesible desde diferentes dispositivos.
2. Estado de la documentación visible en tiempo real.
3. Registro de comentarios y retroalimentación.
4. Visualización de estadísticas mediante gráficas.
5. Descarga de datos estadísticos.
6. Generación de un calendario con fechas de entrega.
7. Envío de alertas tempranas a estudiantes.

### Análisis Preliminar del Proyecto

**Diagrama IDF0 del Sistema de Información**

1. **Entradas**: Datos y propuestas del estudiante para inscripción.
2. **Sujetos**: Estudiantes, docentes y tutores.
3. **Salidas**: Asignación de tutores, visualización de cronograma y estadísticas.
4. **Controles**: Normas y regulaciones de la universidad y calendario académico.

### Propuesta de Solución

Desarrollo de un sistema de información para la administración de trabajos de titulación con roles específicos (estudiante, docente, tutor). El sistema permitirá inscripciones, registro de propuestas, seguimiento de documentación, generación de estadísticas y más.

### Diseño de Interfaces

#### Global

1. Mapa de navegación para usuarios globales.
2. Visualización de estadísticos de proyectos pasados.
3. Búsqueda de proyectos pasados.
4. Visualización de requisitos de registro.
5. Registro y inicio de sesión.

#### Estudiantes

1. Mapa de navegación para estudiantes.
2. Visualización del cronograma y detalles de entregables.
3. Envío de entregables y modificación de datos personales.

#### Tutor

1. Mapa de navegación para tutores.
2. Control y registro de sesiones.
3. Visualización del cronograma y requisitos.
4. Estadísticas de estudiantes y comentarios de entregables.

#### Coordinador

1. Mapa de navegación para coordinadores.

#### Jefe de Carrera

1. Mapa de navegación para jefe de carrera.
2. Visualización de estados de proyectos finalizados.

Esta documentación es un resumen del proyecto completo, abarcando desde la conceptualización hasta la implementación final, destacando los objetivos, problemas, soluciones y funcionalidades del sistema. Para una documentación más extensiva, se incluirán detalles técnicos, diagramas de arquitectura, guías de instalación y uso, así como un registro de problemas y soluciones encontradas durante el desarrollo.
