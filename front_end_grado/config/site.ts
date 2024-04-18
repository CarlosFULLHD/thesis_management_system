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
		{
			label: "Relatores",
			href: "/AssignedRapporteurs",
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
			label: "Información de Inscripción",
			href: "/MostrarInfoPublica"
		},

		{
			label: "Proyectos pasados",
			href: "/BuscarBiblioteca",
		},
		{
			label: "Inscribirse",
			href: "/form",
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