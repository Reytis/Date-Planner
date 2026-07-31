"use client";

import { redirect } from 'next/navigation';
import { AuthStatus, useAuth } from '@/hooks/useAuth';

// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Me() {
  const { status } = useAuth();

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  } else {
    redirect("dashboard/trips")
  }
}