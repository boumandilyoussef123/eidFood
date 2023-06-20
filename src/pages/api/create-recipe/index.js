import prisma from "@/lib/prismadb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const { recipe } = req.body;
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

    //get total minutes from totalTime
    let totalTime = 0;
    if (recipe.totalTime) {
        const time = recipe.totalTime.split(':');
        totalTime += +time[1];
        totalTime += +time[0] * 60;
    }


    await prisma.Recipe.create({
        data: {
            userId: user.id,
            users: {
                connect: {
                    id: user.id
                }
            },
            label: recipe.label,
            yield: +recipe.yield,
            image: recipe.image,
            totalTime: totalTime,
            cuisineType: recipe.cuisineType,
            mealType: recipe.mealType,
            dishType: recipe.dishType,
            ingredients: recipe.ingredients,
            healthLabels: recipe.healthLabels,
            digest: recipe.digest,
            createdAt: new Date(),
        }
    }).then((data) => {
        res.status(200).json({ message: 'recipe added' });
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'error adding recipe' });
            res.end()
        })
}