import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prismadb";

export default async function handler(req, res) {
    const { reply } = req.body;
    const { commentId } = req.query;
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

    const newReply = await prisma.reply.create({
        data: {
            text: reply,
            userId,
            commentId,
        },
        include: {
            user: true,
        },
    })
    res.status(201).json(newReply);
}