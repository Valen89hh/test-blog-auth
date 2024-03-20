"use client"

import { FormEvent, useState, useTransition } from "react";
import { register } from "../../../actions/register";
import { redirect } from "next/navigation";
import Container from "@/components/containers/Container";
import Link from "next/link";

interface Message {
    error?: string,
    success?: string
}

const RegisterPage = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState<Message>()
    const [isPending, startTransition] = useTransition()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(async () => {
            const data = await register(fullName, email, password)
            console.log(data)
            setMessage(data)
            if (data.success) {
                redirect("/login")
            }
        })
    }

    return (
        <Container className="flex flex-col gap-2">
            <form onSubmit={onSubmit} className="bg-slate-200 gap-3 flex flex-col p-2 rounded-md">
                <h2 className="text-center font-bold text-2xl">Registrate</h2>
                <input type="text" className="bg-slate-300 text-slate-400 p-1 rounded-md" disabled={isPending} required name="" placeholder="User Name" id="" value={fullName} onChange={e => setFullName(e.target.value)} />
                <input type="email" className="bg-slate-300 text-slate-400 p-1 rounded-md" disabled={isPending} required name="" placeholder="Email" id="" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="bg-slate-300 text-slate-400 p-1 rounded-md" disabled={isPending} required name="" placeholder="****" id="" value={password} onChange={e => setPassword(e.target.value)} />
                {message?.error && (

                    <div className="bg-red-400 p-3 rounded-md">
                        <span>{message.error}</span>
                    </div>
                )}
                {message?.success && (
                    <div className="bg-green-400 p-3 rounded-md">
                        <span>{message.success}</span>
                    </div>
                )}
                <button type="submit" disabled={isPending} className="bg-blue-500 p-2 rounded-md text-white">
                    Register
                </button>
            </form>
            <span className="w-full text-center">
                Ya tienes cuenta? <Link className="text-blue-500 font-bold" href={"/login"}>Login</Link>
            </span>
        </Container>
    );
}

export default RegisterPage;