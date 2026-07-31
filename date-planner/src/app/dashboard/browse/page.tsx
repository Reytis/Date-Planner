"use client";

import { redirect } from 'next/navigation';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useAccount } from '@/hooks/useAccount';
import { DashboardAside, DashboardPages } from '@/components/DashboardAside';

// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Trips() {
  const { status } = useAuth();
  const { account } = useAccount(); // Get the user's trips from the useAccount hook

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  }

  return <main className='flex'>
    <DashboardAside current={DashboardPages.browse} />
    <h1 className="display">{`Hello ${account?.name}`}</h1>
    <h2 className="h1">Browse</h2>
  </main>
}