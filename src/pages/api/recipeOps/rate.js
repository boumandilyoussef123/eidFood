import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
    const { recipeId, rating } = req.body;
    //get loged in user
    const userSession = await getSession({ req });
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        }
    })
    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        }
    })
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    const ratingExists = await prisma.rating.findUnique({
        where: {
            userId_recipeId: {
                userId: user.id,
                recipeId: recipeId
            }
        }
    })
    if (ratingExists) {
        await prisma.rating.update({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: recipeId
                }
            },
            data: {
                rating: rating
            }
        })
    } else {
        await prisma.rating.create({
            data: {
                userId: user.id,
                recipeId: recipeId,
                rating: rating
            }
        })
    }

    //get new average rating from recipe
    const newAvgrating = await prisma.rating.aggregate({
        where: {
            recipeId: recipeId
        },
        _avg: {
            rating: true
        },
        _count: {
            rating: true
        }
    })
    res.status(200).json(
        {
            message: "Recipe rated",
            newAvgrating: newAvgrating?._avg?.rating,
            newNumRatings: newAvgrating?._count?.rating
        });


}