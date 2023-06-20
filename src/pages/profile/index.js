import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ savedRecipes }) => {
    const [recipesShown, setRecipesShown] = useState(8);
    const [showMore, setShowMore] = useState(true);
    const [derivedRecipes, setDerivedRecipes] = useState(savedRecipes.slice(0, recipesShown));

    const showMoreRecipes = () => {
        setRecipesShown(recipesShown + 8);
    }

    useEffect(() => {
        setDerivedRecipes(savedRecipes.slice(0, recipesShown));
        if (recipesShown >= savedRecipes.length) {
            setShowMore(false);
        }
    }, [recipesShown])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
            <main className="flex flex-col w-full px-6 md:px-20">
                {/* <div className="flex items-center justify-between w-full">
                    <h1 className="text-4xl font-base text-primary">
                        Created Recipes
                    </h1>
                    <button className="flex items-center justify-center px-4 py-2 mt-6 text-2xl font-semibold text-white rounded-md bg-primary hover:bg-primary-hover">
                        <Link href="/create-recipe">
                            Create Recipe
                        </Link>
                    </button>
                </div> */}
                <h1 className="text-4xl font-base text-primary">
                    Saved Recipes
                </h1>
                <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 sm:w-full">
                    {
                        derivedRecipes?.map((recipe) => {
                            return (
                                <div
                                    key={recipe.id}
                                    className="max-w-sm overflow-hidden rounded shadow-lg">
                                    <img className="w-96 xl:h-96" src={recipe.image} alt={recipe.label} />
                                    <div className="px-6 py-4">
                                        <div className="mb-2 text-xl font-bold truncate">{recipe.label}</div>

                                    </div>
                                    <div className="px-6 pt-4 pb-2 truncate">
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.cuisineType}</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.mealType}</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.dishType}</span>
                                    </div>
                                    <Link href={`/recipe/${recipe.id}`} className="block w-full px-4 py-2 font-semibold text-center text-white bg-primary hover:bg-primary-dark">
                                        View Recipe
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    showMore && (
                        <button
                            onClick={showMoreRecipes}
                            className="flex items-center justify-center mt-6 text-2xl font-semibold text-font-color hover:text-font-color-light">
                            Show More
                        </button>
                    )
                }
            </main >
        </div >

    )
}

export default Profile


import prisma from "../../lib/prismadb"
export async function getServerSideProps(context) {
    const userSession = await getSession(context)
    //get all recipes
    if (!userSession) {
        return {
            redirect: {
                destination: '/register',
                permanent: false
            }
        }
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        },
        include: {
            recipes: true
        }
    })

    return {
        props: {
            savedRecipes: user?.recipes || []
        }
    }
}
