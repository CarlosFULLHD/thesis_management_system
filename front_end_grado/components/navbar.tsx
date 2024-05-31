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
import UserProfile from "./userProfile";
import { SignInButton } from "./authButtons";
export const Navbar = () => {
  const router = useRouter();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-blue-light dark:bg-blue-dark"
    >
      <NavbarContent className="sm:hidden basis-1 ml-8" justify="start">
        {/* <NavbarMenuToggle /> */}
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent justify="end" className="gap-10">
        <ThemeSwitch className="hidden sm:inline" />
        <SignInButton />
      </NavbarContent>
    </NextUINavbar>
  );
};
