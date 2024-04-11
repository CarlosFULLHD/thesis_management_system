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
			label: "Inicio",
			href: "/MostrarInfoPublica",
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
			label: "Desertion",
			href: "/EstudiantesAbandono",
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
			href: "/GestionTareas",
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