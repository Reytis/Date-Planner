"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';


export default function Me() {
  const router = useRouter();

  return <div className="min-h-screen">
      <div className="max-w-md mx-auto pt-12">
      <div className=" rounded-lg shadow p-8">
        <h1 className="text-4xl font-bold mb-8 font-mono ">My Account</h1>
        <Button onClick={() => router.push('/home')}>
          Logout
        </Button>
      </div>
    </div>
  </div>
}