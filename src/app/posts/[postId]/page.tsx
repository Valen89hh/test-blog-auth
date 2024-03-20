import Link from "next/link";
import { getPostById, getUserById } from "../../../../actions/api";
import Container from "@/components/containers/Container";

const PostDetail = async ({ params }: { params: { postId: string } }) => {

    const post = await getPostById(params.postId)
    const author = await getUserById(post?.authorId as string)

    return (
        <>
            {post ? (
                <Container className="flex h-[80vh] justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border-solid flex flex-col gap-3 items-center justify-center col-span-1 p-2 border-slate-500 border-b-2 sm:border-b-0 sm:border-r-2">
                            {author?.image && (
                                <img src={author.image} alt="imgane" className="rounded-md mx-auto" />
                            )}
                            <h3 className="">Author: <span className="text-slate-500 font-bold">{author?.name}</span></h3>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <h1 className="text-slate-700 font-bold text-[2.5rem] ">{post?.title}</h1>
                            <p>{post.description} </p>
                        </div>
                    </div>
                </Container>
            ) : (

                <h1>Post no encontrado <Link className="text-slate-800 font-bold" href={"/"}>Ver mas post</Link> </h1>

            )}
        </>
    );
}

export default PostDetail;