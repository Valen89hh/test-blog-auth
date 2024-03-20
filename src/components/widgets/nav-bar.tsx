"use client"

import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {

    const { data: session, status } = useSession()


    return (<header className="bg-slate-500 sticky top-0 left-0 text-white p-2 flex justify-between items-center">
        <h1 className="text-2xl">
            <Link href={"/"}>
                Mis Posts
            </Link>
        </h1>

        <nav>
            <ul className="flex gap-2 items-center">
                <li>
                    <Link href={"/me"}>
                        Crear
                    </Link>
                </li>

                {
                    status == "loading" && (
                        <li>Loading...</li>
                    )
                }
                {
                    status == "authenticated" && (
                        <>
                            <li className="flex items-center">

                                {session.user?.image ? (
                                    <img className="rounded-full size-10" src={session.user.image} alt="img" />
                                ) : (
                                    <span>{session.user?.name}</span>

                                )}
                            </li>
                            <li onClick={() => signOut()} className="bg-red-400 p-2 rounded-md">
                                Log Out
                            </li>
                        </>
                    )
                }
                {
                    status == "unauthenticated" && (
                        <Link href={"/login"} className="bg-green-400 p-2 rounded-md">
                            Login
                        </Link>
                    )
                }
            </ul>
        </nav>
    </header>);
}

export default NavBar;