"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const register = async (name: string, email: string, password: string)=>{
    console.log({name, email, password})

    const existUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if(existUser){
        return { error: "Email already in use!"}
    }
    console.log("Hola pase")
    const hashPass = await bcrypt.hash(password, 10)

    await db.user.create({
        data: {
            name,
            email,
            password: hashPass
        }
    })
    console.log("Hola pase 2")

    return { success: "user creted "}
}