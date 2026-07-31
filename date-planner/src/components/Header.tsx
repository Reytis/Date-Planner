"use client";

import { Logo, Profile, Right } from "@/assets/icons";
import { CtaGhost, CtaPrimary, CtaSecondary } from "./Buttons/Cta";
import { redirect, useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter() // get router to handle history version

  return <header className="sticky bg-background w-full top-0 z-50 flex flex-row items-center justify-between px-16 py-6">
    <div className="flex flex-row gap-4 items-center cursor-pointer **:cursor-pointer" onClick={() => redirect("/")}>
      <Logo className="size-12" />
      <h1 className="h1">Viati</h1>
    </div>
    <nav className="absolute left-1/2 -translate-x-1/2">
      <ul className="flex flex-row gap-2">
        <li><CtaGhost onClick={() => redirect("#about")}>About Us</CtaGhost></li>
        <li><CtaGhost onClick={() => redirect("#pricing")}>Pricing</CtaGhost></li>
        <li><CtaGhost onClick={() => redirect("#contact")}>Contact</CtaGhost></li>
      </ul>
    </nav>
    <div className="flex flex-row gap-4">
      <CtaPrimary onClick={() => router.push("/auth/login")}>
        <Profile className="size-6" />
        Login
      </CtaPrimary>
      <CtaSecondary onClick={() => router.push("/auth/register")}>
        <Right className="size-6" />
        Register
      </CtaSecondary>
    </div>
  </header>
}