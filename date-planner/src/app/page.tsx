"use client";

import { CtaPrimary, CtaSecondary } from '@/components/Buttons/Cta';
import { AuthStatus, useAuth } from '@/hooks/useAuth';
import { useRouter, redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PricingCard } from '@/components/cards/PricingCard';
import { PricingList } from '@/components/cards/PricingList';
import { Input } from '@/components/forms/Input';
import { StringInput, StringType } from '@/components/forms/inputs/StringInput';
import { Textarea } from '@/components/forms/inputs/Textarea';

export default function Home() {
  const { authenticate, status } = useAuth();
  const router = useRouter() // Router to handle history

  // On component mount, call the authenticate function to check if the user is authenticated and update the authentication status accordingly
  useEffect(() => {
    authenticate();
  }, [authenticate])

  // If the authentication status is unknown show a loading state
  if (status === AuthStatus.Unknown) {
    return <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
      <h1 className="text-8xl font-black font-mono">Date Planner</h1>
      <p className="text-2xl text-foreground">
        Loading...
      </p>
    </div>
  }

  // If the auth status is known, show the home page with options to login or register
  return <main className="flex flex-col items-center">
    <Header />
    <section id='about' className='min-h-screen max-w-7xl w-full flex justify-center flex-col gap-32 px-32 py-64 mb-64'>
      <article className='flex flex-col gap-6 max-w-2xl'>
        <p className="display">Welcome to Viati</p>
        <p className="p">Are you tired of navigate trough multiple apps and struggle to plan your trips ? <br />
        Meet Viati your trip planner to plan your trip and follow them, sharing them to your friends or to the community.
        </p>
      </article>
      <CtaPrimary onClick={() => router.push('/auth/register')}>Start for Free</CtaPrimary>
    </section>
    <section id='pricing' className='min-h-screen max-w-7xl w-full flex justify-center items-center flex-col gap-8 px-8 py-32 mb-64'>
      <h2 className="display">Pricing</h2>
      <div className='flex gap-12'>
        <PricingCard className={'bg-background-2 border border-background-3 shadow-xl'} title={'Free'} price={'0€'}>
          <PricingList list={[
            "Trip creation (up to 5)",
            "Full summary",
            "Browse community trips",
            "Share your trips"
          ]} />
          <CtaSecondary onClick={() => router.push("/auth/register")}>Get Started</CtaSecondary>
        </PricingCard>
        <PricingCard className={'bg-background-3 border border-background-4 shadow-xl'} title={'Traveler'} price={'50€'}>
          <PricingList list={[
            "Trip creation (unlimited)",
            "Clone community trips",
            "Share private trips",
            "Can appear as featured on browse page",
            "Access to Magic sort and auto optimization of trips"
          ]} />
          <CtaPrimary onClick={() => router.push("/auth/register")}>Subscribe</CtaPrimary>
        </PricingCard>
        <PricingCard className={'bg-background-4 border border-background-3 shadow-xl'} title={'Agency'} price={'-€'}>
          <PricingList list={[
            "All benefits of Traveler",
            "Premium support 24/7",
            "Reccomanded on browsing page",
            "Collaborative trip creation",
            "Certified badge on profile"
          ]} />
          <CtaSecondary onClick={() => redirect("#contact")}>Contact Sales</CtaSecondary>
        </PricingCard>
      </div>
    </section>
    <section id='contact' className='min-h-screen max-w-7xl w-full flex justify-center items-center flex-col gap-8 px-8 py-32 '>
      <article className='bg-background-2 border border-background-3 shadow-2xl p-8 rounded-xl flex flex-col gap-8 max-w-xl w-full'>
        <div>
          <h2 className="display">Contact</h2>
          <p className="p">For any request, suggestions or collaborations</p>
        </div>
        <div className='flex flex-col gap-4'>
          <Input
            label='My e-mail'
          >
            <StringInput 
              placeholder='jhondoe@mail.com'
              value={''} 
              type={StringType.Text} 
              onChange={() => {}} />
          </Input>
          <Input
            label='Topic'
          >
            <StringInput 
              placeholder='Subject of my request'
              value={''} 
              type={StringType.Text} 
              onChange={() => {}} />
          </Input>
          <Input
            label='My message'
            message={`${0}/200 characters`}
          >
            <Textarea 
              placeholder='My super message...'
              value={''} 
              onChange={() => {}} />
          </Input>
        </div>
        <CtaPrimary onClick={() => {}}>Send message</CtaPrimary>
      </article>
    </section>
    <Footer />
  </main>
}
