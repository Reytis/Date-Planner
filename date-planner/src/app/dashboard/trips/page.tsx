"use client";

import { redirect, useRouter } from 'next/navigation';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useAccount } from '@/hooks/useAccount';
import { DashboardAside, DashboardPages } from '@/components/DashboardAside';
import { TripGrid } from './TripGrid';
import { ActionsBar } from './components/ActionsBar';
import { CtaPrimary } from '@/components/Buttons/Cta';
import { Plus } from '@/assets/icons/index';

// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Trips() {
  const { status } = useAuth();
  const { trips, account } = useAccount(); // Get the user's trips from the useAccount hook
  const router = useRouter() //get router to handle possible back button and history evrsion

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  }

  return <main className='flex'>
    <DashboardAside current={DashboardPages.trips} />
    <section className='w-full flex flex-col gap-8 p-6'>
      <div className='flex justify-between items-center w-full'>
        <h1 className="h2">My Trips</h1>
        <CtaPrimary onClick={() => router.push("/trip")} width='w-fit'>
          <Plus className="size-6" />
          Create new trip
        </CtaPrimary>
      </div>
      <ActionsBar />
      <TripGrid trips={trips} gridName="Created by me" />
      <TripGrid trips={[]} gridName="Bookmarked trips" />
    </section>
  </main>
}