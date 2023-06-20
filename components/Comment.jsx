import React, { useRef, useState } from 'react'
import { useSession } from "next-auth/react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';



function Comment({ dbComments, parentId, AddComment, reply, setReply, showReply, setShowReply }) {

    const [comments, setComments] = useState(dbComments || {});
    const { data: session } = useSession();
    const replyRef = useRef(null);
    const [heartIconHover, setHeartIconHover] = useState(false);

    const likeComment = async (commentId) => {
        await fetch(`/api/comments/likeComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId
            })
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Comment liked',
                        {
                            iconTheme: {
                                primary: '#FAAC01',
                            },
                        })
                    return res.json()
                } else if (res.status === 201) {
                    toast.success('Comment unliked',
                        {
                            iconTheme: {
                                primary: '#FAAC01',
                            },
                        })
                    return res.json()
                }
            }).then(data => {
                let tempComments = [...comments[parentId]]
                tempComments.map((comment) => {
                    if (comment.id === commentId) {
                        if (data.message === 'Comment liked') {
                            comment.isLiked = true
                            comment.numLikes = data.numberOfLikes
                        } else {
                            comment.isLiked = false
                            comment.numLikes = data.numberOfLikes
                        }
                    }
                })
                setComments({ ...comments, [parentId]: tempComments })
            })
            .catch(err => console.log(`Error: ${err}`)
            )
    };



    return (
        comments[parentId]?.map((comment) => (
            <div className="flex flex-col pl-4 ml-4 space-y-2 divide-x-2 divide-primary divide-opacity-40">
                <div className="flex items-center space-x-4" key={comment.id}>
                    <img
                        className="w-10 h-10 rounded-full"
                        src={comment?.user?.image}
                        alt=""
                    />
                    <div className="flex-1 p-2 border rounded-lg border-font-color-light border-opacity-20">
                        <p className="font-semibold">{comment.user?.name}</p>
                        <p className="text-sm">{comment.text}</p>
                        {
                            comment.isLiked ?
                                (
                                    heartIconHover === comment?.id ?
                                        <>
                                            <p className="inline p-1 text-sm font-semibold text-font-color-light">{comment?.numLikes}</p>
                                            <BsHeart
                                                onMouseLeave={() => setHeartIconHover(false)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4 text-primary" />
                                        </>
                                        :
                                        <>
                                            <p className="inline p-1 text-sm font-semibold text-font-color-light">{comment?.numLikes}</p>
                                            <BsHeartFill
                                                onMouseEnter={() => setHeartIconHover(comment?.id)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4 text-primary" />
                                        </>
                                )
                                :
                                (
                                    heartIconHover === comment?.id && session?.user ?
                                        <>
                                            <p className="inline p-1 text-sm font-semibold text-font-color-light">{comment?.numLikes}</p>
                                            <BsHeartFill
                                                onMouseLeave={() => setHeartIconHover(false)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4 text-primary" />
                                        </>
                                        :
                                        <>
                                            <p className="inline p-1 text-sm font-semibold text-font-color-light">{comment?.numLikes}</p>
                                            <BsHeart
                                                onMouseEnter={() => setHeartIconHover(comment?.id)}
                                                onClick={() => likeComment(comment?.id)}
                                                className="inline w-4 h-4 text-primary" />
                                        </>
                                )
                        }
                        {
                            session?.user ?

                                <button
                                    onClick={() => { showReply === comment?.id ? setShowReply(false) : setReply(''); setShowReply(comment?.id); replyRef.current?.focus() }}
                                    className="text-sm text-primary ml-1.5 font-semibold hover:underline">Reply</button>
                                : null
                        }
                        {
                            showReply === comment?.id && (
                                <div className="flex w-1/3 space-x-2">
                                    <div className="flex flex-col items-center space-y-2">
                                        <img
                                            className="w-6 h-6 rounded-full"
                                            src={session?.user?.image}
                                            alt=""
                                        />
                                        <p className="text-xs font-semibold text-font-color-light">{session?.user?.name}</p>
                                    </div>
                                    <form
                                        onSubmit={(e) => AddComment(e, comment.id, true)}
                                        className="flex flex-col items-end w-full">
                                        <textarea
                                            ref={replyRef}
                                            rows={1}
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                            placeholder="Add a reply..."
                                        ></textarea>
                                        <button
                                            disabled={!reply}
                                            className="w-16 p-2 mt-2 text-xs text-white rounded-lg bg-primary hover:bg-primary-hover disabled:bg-font-color focus:outline-none focus:bg-primary-hover"
                                            type="submit"
                                        >
                                            Reply
                                        </button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Comment dbComments={comments} parentId={comment.id} AddComment={AddComment} reply={reply} setReply={setReply} showReply={showReply} setShowReply={setShowReply} />
            </div>
        ))
    )
}

export default Comment