import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { SignupForm } from "@/components/signup-form"

function Register() {
    const handleInputChange = (set: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => { set(e.target.value) }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <SignupForm />
          </div>
        </div>
    )

}


export default Register