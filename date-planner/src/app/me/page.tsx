"use client";

import { redirect } from 'next/navigation';
import { Button } from '@/components/Button';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useAccount } from '@/hooks/useAccount';
import { SeeTrips } from './seeTrips';
import { AccountPanel } from './accountPanel';
import { CreateTrip } from './createTrip';
import { useState } from 'react';


export enum MeTabs {
  SeeTrips = 0,
  CreateTrip = 1,
  AccountPanel = 2,
}
// The Me component represents the user's profile page, which is only accessible to authenticated users. It displays the user's account information.
export default function Me() {
  const { status, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState(MeTabs.SeeTrips);

  // If the user is not authenticated, redirect them to the login page
  if (status !== AuthStatus.Authenticated) {
    redirect("/auth/login");
  }
  const { account } = useAccount(); // Get the user's account information after confirming they are authenticated


  return <div className="min-h-screen">
      <div className="max-w-lvw mx-auto pt-12">
      <div className=" rounded-lg shadow p-8">
        <h1 className="text-4xl font-bold mb-8 font-mono ">{account.name}</h1>
        <Button onClick={logout}>
          Logout
        </Button>
        <Button onClick={() => redirect('/')}>
          Home
        </Button>

        <nav>
          <ul className="flex space-x-4 mt-8">
            <li>
              <button 
                className={`px-3 py-2 rounded ${selectedTab === MeTabs.SeeTrips ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
                onClick={() => setSelectedTab(MeTabs.SeeTrips)}
              > See Trips</button>
            </li>
            <li>
              <button 
                className={`px-3 py-2 rounded ${selectedTab === MeTabs.CreateTrip ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
                onClick={() => setSelectedTab(MeTabs.CreateTrip)}
              > Create Trip</button>
            </li>
            <li>
              <button 
                className={`px-3 py-2 rounded ${selectedTab === MeTabs.AccountPanel ? 'bg-blue-500 text-black' : 'bg-gray-200'}`}
                onClick={() => setSelectedTab(MeTabs.AccountPanel)}
              > Account Panel</button>
            </li>
          </ul>
        </nav>
        {
          (() => {
            switch (selectedTab) {
              case MeTabs.SeeTrips:
                return <SeeTrips />;
              case MeTabs.CreateTrip:
                return <CreateTrip />;
              case MeTabs.AccountPanel:
                return <AccountPanel />;
            }
          })()
        }
      </div>
    </div>
  </div>
}