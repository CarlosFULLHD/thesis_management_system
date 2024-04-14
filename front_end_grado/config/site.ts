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
			label: "Tareas taller uno",
			href: "/GestionTareas/Tareas-taller-uno"
		},
		{
			label: "Tareas taller uno",
			href: "/GestionTareas/Tareas-taller-dos"
		},

	],
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
		{
			label: "Buscar biblioteca",
			href: "/BuscarBiblioteca",
		},
		{
			label: "Formulario",
			href: "/form",
		},
		{
			label: "Perfiles de grado",
			href: "/Perfil-grado/MostrarPerfilGrado",
		},
		{
			label:"Crear cogigo temporal",
			href: "/CrearCodigoTemporal"
		},
		{
			label: "Código temporal",
			href: "/CodigoTemporal"
		},
		{
			label: "Formulario docente",
			href: "/form_docentes",
		},
		{
			label: "Gestión info pública",
			href: "/GestionInfoPublica",
		},
		
		{
			label: "Información pública",
			href: "/MostrarInfoPublica"
		},
		{
			label: "Coordinador-info",
			href: "/dashboardInformation",
		},
		{
			label: "Gestion tareas",
			href: "/GestionTareas/ElegirTaller",
		},

		{
			label: "Login",
			href: "/Login",
		}
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