import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prismadb";

export default async function handler(req, res) {
    const { comment, parentId } = req.body;
    const { recipeId } = req.query;
    const session = await getSession({ req });
    const userSession = session?.user;
    if (!userSession) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userSession.email,
        },
    })
    const userId = user.id;

    await prisma.comment.create({
        data: {
            text: comment,
            recipeId,
            userId,
            parentId,

        }
    });

    const allComments = await prisma.comment.findMany({
        where: {
            recipeId: recipeId,
        },
        include: {
            user: true,
            commentLikes: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    res.status(201).json(allComments);
}