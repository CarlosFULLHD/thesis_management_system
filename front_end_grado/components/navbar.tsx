"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { sign } from "crypto";
import { useRouter } from "next/navigation";
import { useSession } from "../app/providers/SessionProvider";
import UserProfile from "./userProfile";
export const Navbar = () => {
  const router = useRouter();
  const { token } = useSession();
  const isLoggedIn = !!token; // Convert token presence to a boolean to check logged-in status
  console.log("Token: ", token); // Logs the current token
  console.log("Is Logged In: ", isLoggedIn); // Logs whether the user is considered logged in

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit z-50">
          <NextLink
            className="flex justify-start items-center gap-5 z-50"
            href="/"
          >
            <Logo />
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 justify-start ml-16">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>

        {isLoggedIn ? (
          <NavbarItem>
            <UserProfile />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} href="/Login" className="bg-blue-500 text-white">
              Iniciar Sesion
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem> */}

        <NavbarItem className="hidden md:flex"></NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
  // <NextUINavbar maxWidth="xl" position="sticky">
  //   <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
  //     <NavbarBrand as="li" className="gap-3 max-w-fit">
  //       <NextLink className="flex justify-start items-center gap-1" href="/">
  //         <Logo />
  //         <p className="font-bold text-inherit">ACME</p>
  //       </NextLink>
  //     </NavbarBrand>
  /* {session && (
          <>
            {session.user?.role === 'COORDINADOR' && (
              <NavbarItem>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                  {siteConfig.navItemsCoordinador.map((item) => (
                    <NavbarItem key={item.href}>
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium"
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarItem>
            )}
            {session.user?.role === 'ESTUDIANTE' && (
              <NavbarItem>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                  {siteConfig.navItemsEstudiante.map((item) => (
                    <NavbarItem key={item.href}>
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium"
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarItem>
            )}
          </>
        )}

        {!session && (
          <NavbarItem>
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItemsGeneral.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarItem>
        )} 
         <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */
  // </NavbarContent>

  // <NavbarContent
  //   className="hidden sm:flex basis-1/5 sm:basis-full"
  //   justify="end"
  // >
  //   <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
  //   <NavbarItem className="hidden md:flex">
  //{session?.user ? (
  // <div className="flex gap-x-2 items-center"> */}
  /* <Link href="/dashboardInformation" aria-label="Twitter">
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link isExternal href={siteConfig.links.github} aria-label="Github">
                <GithubIcon className="text-default-500" />
              </Link> */
  /* <p>
                {session.user.name}
              </p> */
  /* <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                onClick={async () => { await signOut({ callbackUrl: "/" }) }} variant="flat"
                startContent={ 
                  session.user.image && (
                    <img
                        src={session.user.image}
                        alt=""
                        className="w-7 h-7 rounded-full cursor-pointer"
                    />
                  )
                }
              >
                Logout
              </Button> */
  /* </div>
          ) : (
            //<NextLink href="/auth/login" passHref>
              <Button
                  //isExternal
                  as="a"
                  className="text-sm font-normal text-default-600 bg-default-100"
                  onClick={() => router.push('/auth/login')}
                  startContent={<HeartFilledIcon className="text-danger" />}
                  variant="flat"
                >
                  Sign In
              </Button>
            //</NextLink>
          )} */
  //     </NavbarItem>
  //   </NavbarContent>

  //   <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
  //     <Link isExternal href={siteConfig.links.github} aria-label="Github">
  //       <GithubIcon className="text-default-500" />
  //     </Link>
  //     <ThemeSwitch />
  //     <NavbarMenuToggle />
  //   </NavbarContent>

  //   <NavbarMenu>
  //     {searchInput}
  //     <div className="mx-4 mt-2 flex flex-col gap-2">
  //       {siteConfig.navMenuItems.map((item, index) => (
  //         <NavbarMenuItem key={`${item}-${index}`}>
  //           <Link
  //             color={
  //               index === 2
  //                 ? "primary"
  //                 : index === siteConfig.navMenuItems.length - 1
  //                   ? "danger"
  //                   : "foreground"
  //             }
  //             href="#"
  //             size="lg"
  //           >
  //             {item.label}
  //           </Link>
  //         </NavbarMenuItem>
  //       ))}
  //     </div>
  //   </NavbarMenu>
  // </NextUINavbar>
  // );
};
