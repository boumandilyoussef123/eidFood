import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
    const { commentId } = req.body;
    //get loged in user
    const userSession = await getSession({ req });
    if (!userSession) {
        res.status(401).json({ message: "Not Authorized" });
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        }
    })

    //check if user has already liked the comment
    const commentLike = await prisma.commentLikes.findUnique({
        where: {
            userId_commentId: {
                userId: user?.id,
                commentId: commentId
            }
        }
    })
    if (commentLike) {
        //if user has already liked the comment, unlike it
        await prisma.commentLikes.delete({
            where: {
                userId_commentId: {
                    userId: user?.id,
                    commentId: commentId
                },
            }
        }).catch((err) => {
            console.log(err);
        }
        )
        res.status(201).json({
            message: "Comment unliked",
            numberOfLikes: await prisma.commentLikes.count({
                where: {
                    commentId: commentId
                }
            })
        });
        return
    }
    await prisma.commentLikes.create({
        data: {
            user: {
                connect: {
                    id: user?.id
                }
            },
            comment: {
                connect: {
                    id: commentId
                }
            }
        }
    }).catch((err) => {
        console.log(err);
    })
    res.status(200).json({
        message: "Comment liked",
        numberOfLikes: await prisma.commentLikes.count({
            where: {
                commentId: commentId
            }
        })
    });

}