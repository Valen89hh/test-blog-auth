"use client"
import { Post, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getUserById } from "../../../actions/api"

interface CardPostProps {
    post: Post
    user: User | undefined
}

const CardPost: React.FC<CardPostProps> = ({
    post,
    user
}) => {

    const route = useRouter()

    const onNavToPostDetail = () => {
        route.push(`/posts/${post.id}`)
    }

    return (


        <article onClick={onNavToPostDetail} className="space-y-4 bg-slate-400 p-2 rounded-md">
            <h2 className="text-white text-2xl">{post.title}</h2>
            <p className="text-slate-100 text-sm">{post.description}</p>
            <div className="flex gap-2">
                {user && user.image && (
                    <img src={user.image} alt={user.name as string} className="rounded-full size-6" />
                )}
                <span>{user?.name}</span>
            </div>
        </article>);
}

export default CardPost;