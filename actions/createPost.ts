"use server"

import { db } from "@/lib/db"

export const createPost = async (title: string, description: string, userId: string)=>{
    
    try{
        
        await db.post.create({
            data: {
                title: title,
                description: description,
                author: { connect: { id: userId}}
            }
        })
        return { success: "Post Creat Success"}
    }catch(e){
        console.log(e)
        return { error: "Erro al crear el post"}
    }
    
}