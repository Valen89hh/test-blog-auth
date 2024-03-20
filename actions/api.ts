"use server"

import { db } from "@/lib/db"
import { User } from "@prisma/client"

export const getAllPosts = async (query?: string)=>{
    const posts = query ? await db.post.findMany({
        where: {
            title :{
                startsWith: query
            }
        }
    }) : await db.post.findMany()
    //console.log(posts)
    const tempIds: string[] = []
    posts.forEach(pt=>{
        if(!tempIds.includes(pt.authorId)) tempIds.push(pt.authorId)
    })
    const users: User[] = []
    for (let index = 0; index < tempIds.length; index++) {
        const user = await db.user.findUnique({
            where: {
                id: tempIds[index]
            }
        })
        if(user) users.push(user)
    }
    console.log("----------------------------------------------------")
    console.log(users)
    return {
        posts,
        users
    }
}

export const getUserById = async (userId: string)=>{
    try{

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    }catch{
        return null
    }
}

export const getPostById = async (postId: string)=>{
    try{
        const post = await db.post.findUnique({
            where: {
                id: postId
            }
        })
    
        return post
    }catch(e){
        return null
    }
}
export const searchPost = async (search: string)=>{
    try{
        const post = await db.post.findMany({
            where: {
                title: {
                    startsWith: search
                }
            }
        })
    
        return post
    }catch(e){
        return null
    }
}