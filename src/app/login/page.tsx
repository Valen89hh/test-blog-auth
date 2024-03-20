"use client"

import { FormEvent, useState } from "react"
import { loginCrediantal } from "../../../actions/login"
import { signIn } from "next-auth/react"
import Container from "@/components/containers/Container"
import Link from "next/link"

const LoginPage = () => {
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginCrediantal(email, password)
    }

    return (
        <Container className="flex flex-col gap-3">
            <form onSubmit={onSubmit} className="bg-slate-200 p-2 rounded-md flex flex-col gap-3">
                <h2 className="text-center font-bold text-2xl">Login</h2>
                <input className="bg-slate-300 p-1 rounded-md text-slate-400" value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="user@example.com" />
                <input className="bg-slate-300 p-1 rounded-md text-slate-400" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*****" />
                <button type="submit" className="bg-slate-800 text-white rounded-md p-2">Login</button>
            </form>
            <button onClick={() => {
                signIn("google", {
                    callbackUrl: "/me"
                })
            }} className="bg-green-500 w-full rounded-md p-3 text-white roudend-md">
                Google
            </button>
            <span className="w-full text-center">
                No Tienes Cuenta? <Link className="text-green-500 font-bold" href={"/register"}>Registrate</Link>
            </span>

        </Container>
    );
}

export default LoginPage;