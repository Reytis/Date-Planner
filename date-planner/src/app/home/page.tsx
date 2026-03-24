"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function Home() {
  const router = useRouter();
  
  return <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left p-8">
    <h1 className="text-8xl font-black font-mono">Date Planner</h1>
    <Button onClick={() => router.push("/auth/login")}>
      Login
    </Button>
    <Button onClick={() => router.push("/auth/register")}>
      Register
    </Button>
  </div>
}