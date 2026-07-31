"use client"

import { Profile, Right } from "@/assets/icons";
import { CtaPrimary, CtaSecondary } from "@/components/Buttons/Cta";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/forms/Input";
import { CheckboxInput } from "@/components/forms/inputs/Checkbox";
import { StringInput, StringType } from "@/components/forms/inputs/StringInput";
import { Header } from "@/components/Header";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useState } from "react"

// Login component that renders a login form and handles user authentication
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { login, status } = useAuth();

  // If the user is already authenticated, redirect them to the /me page
  if (status === AuthStatus.Authenticated) {
    redirect("/dashboard/trips");
  }

  return <main className="flex flex-col items-center">
    <Header />
    <section className="min-h-screen max-w-7xl w-full flex items-center flex-col gap-8 px-8 py-32 ">
      <article className="flex flex-col gap-4 w-md bg-background-2 p-8 rounded-3xl shadow-2xl">
        <h1 className="display">Login</h1>
        <Input
          label="Email"
        >
          <StringInput
            type={StringType.Email}
            placeholder="YourEmail@exemple.com"
            value={email}
            onChange={(v) => typeof v === "string" ? setEmail(v) : null}
          /> 
        </Input>
        <Input
          label="Password"
          tooltip="forgot password ?"
          onClick={()=> alert("ouch problem")}
        >
          <StringInput
            type={StringType.Password}
            placeholder="Password"
            value={password}
            onChange={(v) => typeof v === "string" ? setPassword(v) : null}
          /> 
        </Input>
        <CheckboxInput 
          label="Remember me ?" 
          checked={rememberMe} 
          onChange={() => setRememberMe(!rememberMe)} />
        <CtaPrimary onClick={() => login(email, password)}><Profile className="size-6" /> Login</CtaPrimary>
        <CtaSecondary onClick={() => redirect("/auth/register")}><Right className="size-6" /> Register</CtaSecondary>
      </article>
    </section>
    <Footer />
  </main>
}