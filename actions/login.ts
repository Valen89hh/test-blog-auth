"use server"

import { signIn } from "@/auth"

export const loginCrediantal = async (email: string, password: string)=>{
    console.log(email, password)

    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/me"
        })
    }catch(error){
        // TODO
        console.log(error)
        throw error
    }

}