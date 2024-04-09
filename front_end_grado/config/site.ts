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
			label: "Inicio",
			href: "/",
		},
		{
			label: "Formulario",
			href: "/form",
		},
		/* {
		   label: "Coordinador-info",
		   href: "/dashboardInformation",
		 },*/
		{
			label: "Gestión info pública",
			href: "/GestionInfoPublica",
		},
		{
			label: "Buscar biblioteca",
			href: "/BuscarBiblioteca",
		},
		{
			label: "Información pública",
			href: "/MostrarInfoPublica"
		},
		{
			label: "Login",
			href: "/Login",
		},
		{
			label:"Crear cogigo temporal",
			href: "/CrearCodigoTemporal"
		},
		{
			label: "Código temporal",
			href: "/CodigoTemporal"
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