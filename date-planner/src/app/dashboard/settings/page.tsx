"use client";

import { redirect } from 'next/navigation';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useAccount } from '@/hooks/useAccount';
import { DashboardAside, DashboardPages } from '@/components/DashboardAside';
import { ToggleInput } from '@/components/forms/inputs/Toggle';
import { Logout, Moon, Sun } from '@/assets/icons/index';
import { useTheme } from '@/hooks/useTheme';
import { CtaSecondary } from '@/components/Buttons/Cta';

// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Trips() {
  const { status, logout } = useAuth();
  const { account } = useAccount(); // Get the user's trips from the useAccount hook
  const { theme, toggleTheme } = useTheme();

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  }

  return <main className='flex'>
    <DashboardAside current={DashboardPages.settings} />
    <section className='flex flex-col gap-16 p-6'>
      <h1 className="h1">Settings</h1>
      <article className='flex flex-col gap-6'>
        <div>
          <h3 className='h3'>Preferences</h3>
          <p className='small-p'>Personalize your experience</p>
        </div>
        <div>
          <p className='h5'>Appearence :</p>
          <ToggleInput checked={theme === "dark"} onClick={() => toggleTheme()} before={<Sun className="size-6" />} after={<Moon className="size-6" />} />
        </div>
      </article>
      <CtaSecondary onClick={() => logout()} >
        <Logout className="size-6" />
        Log Out
      </CtaSecondary>
    </section>
  </main>
}