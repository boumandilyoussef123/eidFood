import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
    const { recipeId } = req.query;
    const userSession = await getSession({ req });
    if (!userSession) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        },
        include: {
            ratings: true
        }
    })
    const personalRating = user.ratings.filter(rating => rating.recipeId === recipeId)
    res.status(200).json({ personalRating: personalRating[0]?.rating });
}