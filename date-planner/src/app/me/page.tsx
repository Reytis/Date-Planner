"use client";

import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useAccount } from '@/hooks/useAccount';

// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Me() {
  const { status, logout } = useAuth();
  const { account } = useAccount();

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  }

  return <div className="min-h-screen">
      <div className="max-w-md mx-auto pt-12">
      <div className=" rounded-lg shadow p-8">
        <h1 className="text-4xl font-bold mb-8 font-mono ">{account.email}</h1>
        <Button onClick={logout}>
          Logout
        </Button>
        <Button onClick={() => redirect('/')}>
          Home
        </Button>
      </div>
    </div>
  </div>
}