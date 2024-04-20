export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
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
			label: "prueba",
			href: "/Test"
		},
		{
			label: "prueba",
			href: "/TestTwo"
		},
		{
			label: "prueba",
			href: "/TestThree"
		}
		

	],
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
		{
			label: "Buscar biblioteca",
			href: "/Buscar-biblioteca",
		},
		{
			label: "Formulario",
			href: "/form",
		},
		{
			label: "Inscritos",
			href: "/EstudiantesInscritos",
		},
		{
			label: "Solicitudes Abandono",
			href: "/EstudiantesAbandono",
		},
		{
			label: "Desertion",
			href: "/EstudiantesAbandonoHistoria",
		},
		{
			label: "Abandonar",
			href: "/EstudianteAbandonoSolicitud",
		},
		{
			label: "Perfiles de grado",
			href: "/Perfil-grado/MostrarPerfilGrado",
		},
		{
			label:"Crear cogigo temporal",
			href: "/Codigo-temporal/Crear"
		},
		{
			label: "Verificar código temporal",
			href: "/Codigo-temporal/Verificar"
		},
		{
			label: "Formulario docente",
			href: "/form_docentes",
		},
		{
			label: "Gestión info pública",
			href: "/Informacion-publica/Gestion-info-publica",
		},
		
		{
			label: "Información pública",
			href: "/Informacion-publica/Mostrar-info-publica"
		},
		{
			label: "Aceptar Estudiantes",
			href: "/dashboardInformation",
		},
		{
			label: "Gestion tareas",
			href: "/Gestion-tareas/Elegir-taller",
		},
		{
			label: "Periodo academico",
			href: "/Periodo-academico/Actual",
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