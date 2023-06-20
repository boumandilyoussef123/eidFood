import Link from "next/link";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Comments({ dbComments, parentId }) {
    const [comments, setComments] = useState(dbComments || {});
    const [comment, setComment] = useState("");
    const [showReply, setShowReply] = useState();
    const [reply, setReply] = useState("");
    const router = useRouter();
    const { recipeId } = router.query;
    const { data: session } = useSession();

    const AddComment = async (e, parentId, isReply) => {
        e.preventDefault();
        const newComments = await fetch(`/api/comments/addComment/${recipeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: isReply ? reply : comment,
                parentId
            }),
        });
        const newCommentsJson = await newComments.json();
        // group comments by parent
        let groupedComments = {};
        newCommentsJson.forEach(comment => {
            groupedComments[comment.parentId] = groupedComments[comment.parentId] || [];
            groupedComments[comment.parentId].push(comment);
        });
        Object.values(groupedComments).forEach((comments) => {
            comments.forEach((comment) => {
                comment.numLikes = comment.commentLikes?.length
                //is user logged in and has liked comment
                comment.isLiked = comment.commentLikes?.some(
                    (like) => like.userId === session?.user?.id
                )
            })
        })
        setComments(groupedComments);
        setComment("");
        setReply("");
        setShowReply(false);
    }


    return (
        <div className="flex flex-col space-y-4">
            {
                session?.user ? (
                    <div className="flex mt-6 space-x-4">
                        <div className="flex flex-col space-y-2">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={session.user.image}
                                alt=""
                            />
                            <p className="text-sm font-semibold text-font-color-light">{session.user.name}</p>
                        </div>
                        <form
                            onSubmit={AddComment}
                            className="flex flex-col items-end w-full">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                placeholder="Add a comment..."
                            ></textarea>
                            <button
                                disabled={!comment}
                                className="w-32 p-2 mt-2 text-white rounded-lg bg-primary hover:bg-primary-hover disabled:bg-font-color focus:outline-none focus:bg-primary-hover"
                                type="submit"
                            >
                                Comment
                            </button>
                        </form>
                    </div>) :
                    (
                        <div className="flex mt-6 space-x-4">
                            <h1 className="text-2xl font-semibold text-font-color-light">Please
                                <Link href={`/register?redirect=${recipeId}`}
                                    className="mx-1 underline">sign in</Link> to comment</h1>
                        </div>
                    )
            }
            <Comment
                key={JSON.stringify(comments)}
                dbComments={comments} parentId={parentId} AddComment={AddComment} reply={reply} setReply={setReply} showReply={showReply} setShowReply={setShowReply} />
        </div>
    );
}

export default Comments;

