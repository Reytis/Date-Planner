"use client"

import { Profile, Right } from "@/assets/icons";
import { CtaPrimary, CtaSecondary } from "@/components/Buttons/Cta";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/forms/Input";
import { StringInput, StringType } from "@/components/forms/inputs/StringInput";
import { Header } from "@/components/Header";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useState } from "react"

// Register page component that allows users to create a new account by providing their email and password.
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { status } = useAuth();

  // If the user is already authenticated, redirect them to the /me page
  if (status === AuthStatus.Authenticated) {
    redirect("/me");
  }
  
  async function submit() {
    try {
      await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    redirect("/auth/login");
    } catch (err) {
      console.error("Registration error", err);
    }
  }

  return <main className="flex flex-col items-center">
      <Header />
      <section className="min-h-screen max-w-7xl w-full flex items-center flex-col gap-8 px-8 py-32 ">
        <article className="flex flex-col gap-4 w-md bg-background-2 p-8 rounded-3xl shadow-2xl">
          <h1 className="display">Register</h1>
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
            label="Name"
          >
            <StringInput
              type={StringType.Text}
              placeholder="jhon Doe"
              value={name}
              onChange={(v) => typeof v === "string" ? setName(v) : null}
            /> 
          </Input>
          <div className="flex flex-row gap-4 items-start">
            <Input
              label="Password"
              message="8 characters minimum"
            >
              <StringInput
                type={StringType.Password}
                placeholder="Password"
                value={password}
                onChange={(v) => typeof v === "string" ? setPassword(v) : null}
              /> 
            </Input>
            <Input
              label="Confirm password"
            >
              <StringInput
                type={StringType.Password}
                placeholder="Confirm password"
                value={password}
                onChange={(v) => typeof v === "string" ? setPassword(v) : null}
              /> 
            </Input>
          </div>
          <CtaPrimary onClick={() => submit()}><Right className="size-6" /> Register</CtaPrimary>
          <CtaSecondary onClick={() => redirect("/auth/login")}><Profile className="size-6" /> Login</CtaSecondary>
        </article>
      </section>
      <Footer />
    </main> 
  }