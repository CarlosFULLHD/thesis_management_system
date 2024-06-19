export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Gestion de Proyectos de Grado",
	description: "Gestiona los proyetos de grado de la UCB",
	navItemsCoordinador: [
		{
			label: "Inicio",
			href: "/",
		},
		{
			label: "Dashboard Letters",
			href: "/dashboardLetters",
		},
		{
			label: "Gestion Informacion Publica",
			href: "/GestionInfoPublica",
		},
		{
			label: "Mostrar Info Publica",
			href: "/MostrarInfoPublica",
		}
	],
	navItemsEstudiante: [
		{
			label: "Inicio",
			href: "/MostrarInfoPublica",
		},
		{
			label: "Buscar Biblioteca",
			href: "/BuscarBiblioteca",
		},
	],
	navItemsGeneral: [
		{
			label: "Formulario",
			href: "/form",
		},
		{
			label: "Inscritos",
			href: "/EstudiantesInscritos",
		},
		{
			label: "Desertion",
			href: "/EstudiantesAbandono",
		},
		{
			label: "Crear código temporal",
			href: "/Codigo-temporal/Crear"
		},
		{
			label: "Verificar código temporal",
			href: "/Codigo-temporal/Verificar"
		},
		{
			label: "Tareas taller uno",
			href: "/Gestion-tareas/Tareas-taller-uno"
		},
		{
			label: "Tareas taller uno",
			href: "/Gestion-tareas/Tareas-taller-dos"
		},
		{
			label: "Historial periodo académico",
			href: "/Periodo-academico/Historial"
		},
		{
			label: "Tareas periodo academico taller I",
			href: "/Periodo-academico/Tareas/Taller-grado-uno"
		},
		{
			label: "Tareas periodo academico taller II",
			href: "/Periodo-academico/Tareas/Taller-grado-dos"
		},
		{
			label: "Mostrar perfil de grado",
			href: "/Perfil-grado/MostrarPerfilGrado"
		},
		{
			label: "Tutor o relator",
			href:"/AssignedRapporteurs"
		},
		{
			label:"Revisar postulación",
			href: "/Hito-coordinador/Revisar-estudiante"
		},
		{
			label:"Detalles postulación",
			href: "/Hito-coordinador/Detalle-estudiante"
		},
		{
			label:"Selección tareas",
			href: "/Tareas/Docente/Seleccion"
		},
		{
			label:"Asignación tareas",
			href: "/Tareas/Docente/Crear"
		},
		{
			label: "Revisar tarea",
			href: "/Tareas/Docente/Revisar"
		},
		{
			label: "Revisar tarea",
			href: "/Tareas/Docente/Modificar"
		},
		{
			label: "Reordenar tarea",
			href: "/Tareas/Docente/Reordenar"
		},
		{
			label: "Revisar tarea",
			href: "/Tareas/Estudiante/Revisar"
		},
		{
			label: "Programar defensa formal",
			href: "/Defensa-formal/Docente/Crear"
		},
		{
			label: "Revisar defensa formal",
			href: "/Defensa-formal/Docente/Revisar"
		}
	],
	navItems: [
		{
			label: "Información de inscripción",
			href: "/Informacion-publica/Mostrar-info-publica",
		},
		{
			label: "Buscar biblioteca",
			href: "/Buscar-biblioteca",
		},
		{
			label: "Información pública",
			href: "/MostrarInfoPublica"
		},
		{
			label: "Login",
			href: "/Login",
		},


	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		login: "/auth/login",
	},
};