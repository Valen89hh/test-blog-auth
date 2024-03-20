"use client"
import { FormEvent, useState, useTransition } from "react";
import { createPost } from "../../../actions/createPost";
import { useSession } from "next-auth/react";

interface DataPost {
    title: string,
    description: string
}

interface StatusPostData {
    error?: string | undefined,
    success?: string | undefined
}

const MePage = () => {

    const { data: session } = useSession()
    const [data, setData] = useState<DataPost>({ title: "", description: "" })
    const [isPending, startTransition] = useTransition()
    const [statusPost, setStatusPost] = useState<StatusPostData>()

    const onCreatePost = (e: FormEvent<HTMLFormElement>) => {
        console.log(session?.user?.id)
        e.preventDefault()
        console.log(data)
        startTransition(async () => {
            if (session?.user?.id) {
                const res = await createPost(data.title, data.description, session?.user?.id)
                console.log(res)
                setStatusPost(res)
                setData({ title: "", description: "" })
            }
        })
    }

    return (
        <>
            <div className="font-bold flex-col text-2xl flex justify-center items-center">

                <h2>Bienvenido aqui puede crear tus blogs</h2>

                <form onSubmit={onCreatePost} className="bg-slate-400 p-4 rounded-md space-y-3">
                    <div className="flex flex-col">
                        <label className="text-white text-sm" htmlFor="iptTitle">Title</label>
                        <input disabled={isPending} value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="text-slate-300 p-1 text-[1.2rem] rounded-md bg-slate-500" type="text" id="iptTitle" placeholder="Enter title" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white text-sm" htmlFor="txtDescription">Description</label>
                        <textarea disabled={isPending} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} placeholder="Enter the description" className="resize-none p-1  text-slate-300 text-sm rounded-md bg-slate-500 h-[10rem] " name="" id="txtDescription" ></textarea>
                    </div>
                    <button disabled={isPending} type="submit" className="text-white bg-blue-700 rounded-md py-1 px-3 text-[1.3rem] ">
                        Create
                    </button>
                </form>

                <div className={`${!statusPost?.success && "hidden"} bg-green-600 p-2 text-white text-sm rounded-md fixed bottom-2 right-2`}>
                    {statusPost?.success}
                </div>
                <div className={`${!statusPost?.error && "hidden"} bg-red-600 p-2 text-white text-sm rounded-md fixed bottom-2 right-2`}>
                    {statusPost?.error}
                </div>
            </div>
        </>
    );
}

export default MePage;