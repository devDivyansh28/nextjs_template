"use client"
import React from 'react'
import {authClient} from "@/lib/auth.client";
import { Button } from '@/components/ui/button';
import {useRouter} from "next/navigation"



function LogoutButton() {
    const router = useRouter();
    
  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions : {
            onSuccess : ()=>{
                router.push("/login")
            },
            onError : (ctx)=>{
                window.alert(ctx.error)
            },
    },
  })
  };


  return (
    <div>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default LogoutButton
