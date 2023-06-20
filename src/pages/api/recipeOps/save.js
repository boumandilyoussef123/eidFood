import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismadb";

export default async function handler(req, res) {
    const { recipeId } = req.body;
    //get loged in user
    const userSession = await getSession({ req });
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        },
        include: {
            recipes: true
        }
    })
    if (user?.recipes?.some((recipe) => recipe.id === recipeId)) {
        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                recipes: {
                    disconnect: {
                        id: recipeId
                    }
                },
            }
        }).catch((err) => {
            console.log(err);
        })
        res.status(201).json({ message: "Recipe unsaved" });
        return
    }
    await prisma.user.update({
        where: {
            id: user?.id
        },
        data: {
            recipes: {
                connect: {
                    id: recipeId
                }
            },
        }
    }).catch((err) => {
        console.log(err);
    })
    res.status(200).json({ message: "Recipe saved" });

}