"use client";

import { Button } from '@/components/Button';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { authenticate, status } = useAuth();

  // On component mount, call the authenticate function to check if the user is authenticated and update the authentication status accordingly
  useEffect(() => {
    authenticate();
  }, [])

  // If the authentication status is unknown show a loading state
  if (status === AuthStatus.Unknown) {
    return <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left p-8">
      <h1 className="text-8xl font-black font-mono">Date Planner</h1>
      <p className="text-2xl text-gray-500">
        Loading...
      </p>
    </div>
  }

  // If the auth status is known, show the home page with options to login or register
  return <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left p-8">
    <h1 className="text-8xl font-black font-mono">Date Planner</h1>
    <Button onClick={() => redirect("/auth/login")}>
      Login
    </Button>
    <Button onClick={() => redirect("/auth/register")}>
      Register
    </Button>
    <Button onClick={() => redirect("/me")}>
      Profile
    </Button>
  </div>
}
