"use client"
import Image from "next/image";
import Header from "@/app/_components/Header";
import Hero from "@/app/_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {

  const {user}=useKindeBrowserClient();

  useEffect(()=>{
    console.log(user)
  },[user])

  useEffect(()=>{
    console.log("--",user)
  },[user])
  return (
    <div>
       <Header/>
       <Hero/>
    </div>
  );
}
