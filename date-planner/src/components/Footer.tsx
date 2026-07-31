"use client";

import { App, Gallery, Info, MapBox, Neon, Next, Privacy, React, Tailwind, Terms, Typescript } from "@/assets/icons";

export const Footer = () => {

  return <footer className="bg-background-2 py-16 w-full">
    <div className="flex flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
      <div className="w-1/3">
        <h5 className="h5">&copy; 2026 Viati. All rights reserved. RQNDBM.</h5>
      </div>
      <div className="w-1/3 flex flex-col gap-8">
        <h5 className="h5">Informations</h5>
        <ul className="py-2 gap-2 flex flex-col">
          <li className="flex flex-row items-center gap-3">
            <Info className="size-6" />
            <a href="" className="small-p hover:underline cursor-pointer">What is the project ?</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <App className="size-6" />
            <a href="" className="small-p hover:underline cursor-pointer">Application</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Terms className="size-6" />
            <a href="" className="small-p hover:underline cursor-pointer">Terms & Conditions</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Privacy className="size-6" />
            <a href="" className="small-p hover:underline cursor-pointer">Privacy</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Gallery className="size-6" />
            <a href="/ui" className="small-p hover:underline cursor-pointer">Ui Kit</a>
          </li>
        </ul>
      </div>
      <div className="w-1/3 flex flex-col gap-8">
        <h5 className="h5">Built with</h5>
        <ul className="py-2 gap-2 flex flex-col">
          <li className="flex flex-row items-center gap-3">
            <React className="size-6" />
            <a href="https://fr.react.dev/" target="_blank" className="small-p hover:underline cursor-pointer">React</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Typescript className="size-6" />
            <a href="https://www.typescriptlang.org/" target="_blank" className="small-p hover:underline cursor-pointer">TypeScript</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Tailwind className="size-6" />
            <a href="https://tailwindcss.com/" target="_blank" className="small-p hover:underline cursor-pointer">Tailwind CSS</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Neon className="size-6" />
            <a href="https://neon.tech/" target="_blank" className="small-p hover:underline cursor-pointer">Neon - Prisma</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <Next className="size-6" />
            <a href="https://nextjs.org/" target="_blank" className="small-p hover:underline cursor-pointer">NextJS</a>
          </li>
          <li className="flex flex-row items-center gap-3">
            <MapBox className="size-6" />
            <a href="https://www.mapbox.com/" target="_blank" className="small-p hover:underline cursor-pointer">Map Box</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
}