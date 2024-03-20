import { useEffect, useState } from "react";
import CardPost from "./card-post";
import { getAllPosts, getUserById, searchPost } from "../../../actions/api";
import { Post, User } from "@prisma/client";

interface DataPost {
    posts: Post[],
    users: User[]
}

interface ContainerPostProps {
    info: string
}

const ContainerPost: React.FC<ContainerPostProps> = ({
    info
}) => {

    const [dataPosts, setDataPosts] = useState<DataPost>()
    useEffect(() => {
        const loadData = async () => {
            const pt = await getAllPosts()
            setDataPosts(pt)
        }
        console.log("Data")

        loadData()
    }, [])

    useEffect(() => {
        console.log(info)
        //const listFilter = dataPosts?.posts.filter(post => post.title.toLowerCase().startsWith(info.toLowerCase()))
        //console.log(listFilter)

        const dataLoad = async () => {
            setDataPosts(undefined)
            if (info) {

                const postsSearch = await getAllPosts(info)
                console.log("POsts Search: ", postsSearch)
                setDataPosts(postsSearch)
            } else {
                const postsSearch = await getAllPosts()
                console.log("POsts All: ", postsSearch)
                setDataPosts(postsSearch)
            }
        }
        dataLoad()

    }, [info])

    return (
        <>
            {
                !dataPosts && (
                    <span>Loading...</span>
                )
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {dataPosts?.posts.map((post) => (
                    <CardPost
                        key={post.id}
                        post={post}
                        user={dataPosts.users.find(us => us.id == post.authorId)}
                    />
                ))}
            </div>
        </>
    );
}

export default ContainerPost;