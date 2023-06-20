import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
    const { recipeId } = req.query;
    const userSession = await getSession({ req });
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        },
        include: {
            recipes: true
        }
    })
    const isSaved = user.recipes.some(recipe => recipe.id === recipeId);
    res.status(200).json({ isSaved });
}