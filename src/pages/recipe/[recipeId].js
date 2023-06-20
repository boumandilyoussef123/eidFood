import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ReactStars from 'react-rating-stars-component'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Comments from 'components/Comments'
import { useSession } from 'next-auth/react'
import toHoursAndMinutes from 'helpers/toHoursAndMinutes'

function recipeDetails({ dbRecipe, dbComments }) {
    const router = useRouter()
    const { recipeId } = router.query
    const [recipe, setRecipe] = useState(dbRecipe)
    const [isSaved, setIsSaved] = useState(false)
    const [personalRating, setPersonalRating] = useState(0)
    const { data: session } = useSession()
    const [heartIconHover, setHeartIconHover] = useState(false)
    const { hours, minutes } = toHoursAndMinutes(dbRecipe.totalTime)

    useEffect(() => {
        //get saved status
        async function getSavedStatus() {
            await fetch(`/api/recipeOps/getIsSaved?recipeId=${recipeId}`)
                .then((res) => res.json())
                .then((data) => setIsSaved(data.isSaved))
        }
        getSavedStatus()

        //get personal rating
        async function getPersonalRating() {
            const { recipeId } = router.query
            await fetch(`/api/recipeOps/getPersonalRating?recipeId=${recipeId}`)
                .then((res) => res.json())
                .then((data) => {
                    setPersonalRating(+data?.personalRating)
                })
        }
        getPersonalRating()

        //get number of likes for each comment
        Object.values(dbComments).forEach((comments) => {
            comments.forEach((comment) => {
                comment.numLikes = comment.commentLikes?.length
                //is user logged in and has liked comment
                comment.isLiked = comment.commentLikes?.some(
                    (like) => like.userId === session?.user?.id
                )
            })
        })
    }, [session])

    const changeRating = async (newRating) => {
        const { recipeId } = router.query
        await fetch(`/api/recipeOps/rate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeId,
                rating: newRating,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRecipe((prevRecipe) => {
                    return {
                        ...prevRecipe,
                        avgRating: data?.newAvgrating,
                        numRatings: data?.newNumRatings,

                    }
                })
                toast.success('Rating updated', {
                    iconTheme: {
                        primary: '#FAAC01',
                    },
                })
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    const saveRecipe = async () => {
        await fetch(`/api/recipeOps/save/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeId: recipe.uri?.split('#')[1] || recipe.id,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    setIsSaved(false)
                    toast.success('Recipe saved', {
                        iconTheme: {
                            primary: '#FAAC01',
                        },
                    })
                } else if (res.status === 201) {
                    setIsSaved(true)
                    toast.success('Recipe unsaved', {
                        iconTheme: {
                            primary: '#FAAC01',
                        },
                    })
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    const handleImgError = (e) => {
        e.target.src = '/images/recipe-placeholder.png'
        console.log('error')
    }



    return (
        <div className="grid grid-cols-12 my-12 2xl:mx-32">
            <div className="col-span-12 xl:col-span-8">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <div className="flex flex-col items-start">
                                <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl text-primary">
                                    {recipe.label}
                                </h1>
                                <h3 className="ml-3 text-base md:text-xl xl:text-2xl text-font-color-light">
                                    ({recipe.yield} Servings)
                                </h3>
                            </div>
                            <div className="flex flex-row flex-wrap my-3 lg:w-[35rem] xl:w-[50rem] lg:flex-nowrap xl:space-x-12">
                                <div className="flex flex-col items-center w-1/2 mt-3 space-x-2 text-center lg:w-full md:w-1/3 xl:ml-4">
                                    {hours || minutes ? (
                                        <p className="text-base md:text-lg xl:text-xl text-font-color-light">
                                            Total time
                                        </p>
                                    ) : null}
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light">
                                        <span className={!hours ? 'hidden' : ''}>
                                            {hours} hour
                                        </span>{' '}
                                        <span className={!minutes ? 'hidden' : ''}>
                                            {minutes} minutes
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-center w-1/2 mt-3 space-x-2 text-center md:w-1/3 lg:w-full xl:ml-4">
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light">
                                        Cuisine type
                                    </p>
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light first-letter:uppercase">
                                        {recipe.cuisineType}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center w-1/2 mt-3 space-x-2 text-center md:w-1/3 lg:w-full xl:ml-4">
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light">
                                        Meal type
                                    </p>
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light first-letter:uppercase">
                                        {recipe.mealType}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center w-1/2 mt-3 space-x-2 text-center lg:w-full xl:ml-4">
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light">
                                        Dish type
                                    </p>
                                    <p className="text-base md:text-lg xl:text-xl text-font-color-light first-letter:uppercase">
                                        {recipe.dishType}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center w-full mt-3 space-x-2 text-center md:w-1/2 lg:w-full xl:ml-4">
                                    <p className="text-xl md:text-lg text-font-color-light">
                                        {recipe.numRatings} Review(s)
                                    </p>
                                    <div className="flex mb-4">
                                        <ReactStars
                                            key={recipe?.avgRating}
                                            count={5}
                                            value={recipe?.avgRating}
                                            size={24}
                                            isHalf={true}
                                            edit={false}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={
                                                <i className="fa fa-star-half-alt"></i>
                                            }
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center xl:hidden">
                            <div className="relative">
                                <img
                                    onError={handleImgError}
                                    className="object-cover rounded-md shadow-xl xl:w-80 xl:h-80"
                                    src={recipe.image}
                                    alt={recipe.label}
                                />
                                {session?.user ? (
                                    isSaved ? (
                                        heartIconHover ? (
                                            <BsHeart
                                                onMouseLeave={() =>
                                                    setHeartIconHover(false)
                                                }
                                                onClick={saveRecipe}
                                                className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                            />
                                        ) : (
                                            <BsHeartFill
                                                onMouseEnter={() =>
                                                    setHeartIconHover(true)
                                                }
                                                onClick={saveRecipe}
                                                className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                            />
                                        )
                                    ) : heartIconHover ? (
                                        <BsHeartFill
                                            onMouseLeave={() =>
                                                setHeartIconHover(false)
                                            }
                                            onClick={saveRecipe}
                                            className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                        />
                                    ) : (
                                        <BsHeart
                                            onMouseEnter={() => setHeartIconHover(true)}
                                            onClick={saveRecipe}
                                            className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                        />
                                    )
                                ) : null}
                            </div>

                            <p className="-mb-3 text-base xl:text-xl text-font-color-light">
                                My Rating
                            </p>
                            <ReactStars
                                key={personalRating}
                                count={5}
                                value={personalRating}
                                onChange={changeRating}
                                edit={session?.user ? true : false}
                                size={25}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                            {!session?.user ? (
                                <div className="flex mb-3 space-x-4">
                                    <h1 className="text-xl font-semibold text-font-color-light">
                                        Please
                                        <Link
                                            href={`/register?redirect=${recipeId}`}
                                            className="mx-1 underline"
                                        >
                                            sign in
                                        </Link>{' '}
                                        to rate this recipe
                                    </h1>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="grid w-11/12 grid-cols-1 place-items-center sm:grid-cols-2 mx-auto md:grid-cols-3 gap-x-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
                        {recipe.ingredients?.map((ingredient, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-64 sm:w-48 p-1 my-2 bg-ingredient-background xl:w-fit h-fit"
                            >
                                {ingredient.image ? (
                                    <LazyLoadImage
                                        className='w-64 h-64 sm:w-48 sm:h-48'
                                        src={ingredient.image}
                                        alt={ingredient.text}
                                        width={192}
                                        height={192}
                                    />
                                ) : (
                                    <img
                                        className="w-48"
                                        src="/logo.png"
                                        alt="ingredient image not found"
                                    />
                                )}
                                <p className="w-48 mt-4 text-xl text-center truncate text-font-color-light first-letter:uppercase">
                                    {ingredient.food}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col xl:hidden">
                        <div className="px-3 py-6 bg-ingredient-background">
                            <h1 className="text-3xl font-black">Ingredients</h1>
                            <ul className="flex flex-col mt-6 space-y-2">
                                {recipe.ingredients?.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex flex-row items-center space-x-2"
                                    >
                                        <div className="flex flex-col items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-primary">
                                            <p>{index + 1}</p>
                                        </div>
                                        <p className="text-xl w-96 text-font-color-light">
                                            {ingredient.text}.
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h1 className="mt-12 text-2xl font-bold text-font-color-light">
                            Nutrients (per serving)
                        </h1>
                        {recipe.digest?.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-full p-2 px-6 my-2 bg-ingredient-background"
                            >
                                <p className="flex justify-start w-1/3 text-xl text-font-color-light">
                                    {item.label}
                                </p>
                                <p className="flex justify-center w-1/3 text-xl text-font-color-light">
                                    {(item.total / recipe.yield).toFixed(2)}{' '}
                                    {item.unit}
                                </p>
                                <p className="flex justify-end w-1/3 text-xl text-font-color-light">
                                    {(item.daily / recipe.yield).toFixed(2)} %
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col w-11/12 mt-12">
                        <h1 className="text-2xl font-bold text-font-color-light">
                            Health Labels
                        </h1>
                        <div className="flex flex-row flex-wrap">
                            {recipe.healthLabels?.map((label, index) => (
                                <div
                                    key={index}
                                    className="mx-1 my-2 text-xl rounded-full text-font-color-light bg-primary"
                                >
                                    <p className="w-full px-4 py-2 text-secondary">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Comments dbComments={dbComments} parentId={null} />
                    </div>
                </div>
            </div>
            <div className="hidden col-span-4 xl:block">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            onError={handleImgError}
                            className="object-cover rounded-md shadow-xl xl:w-80 xl:h-80"
                            src={recipe.image}
                            alt={recipe.label}
                        />
                        {session?.user ? (
                            isSaved ? (
                                heartIconHover ? (
                                    <BsHeart
                                        onMouseLeave={() =>
                                            setHeartIconHover(false)
                                        }
                                        onClick={saveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                    />
                                ) : (
                                    <BsHeartFill
                                        onMouseEnter={() =>
                                            setHeartIconHover(true)
                                        }
                                        onClick={saveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                    />
                                )
                            ) : heartIconHover ? (
                                <BsHeartFill
                                    onMouseLeave={() =>
                                        setHeartIconHover(false)
                                    }
                                    onClick={saveRecipe}
                                    className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                />
                            ) : (
                                <BsHeart
                                    onMouseEnter={() => setHeartIconHover(true)}
                                    onClick={saveRecipe}
                                    className="absolute top-0 right-0 w-12 h-12 p-2 text-primary"
                                />
                            )
                        ) : null}
                    </div>

                    <p className="-mb-3 text-base xl:text-xl text-font-color-light">
                        My Rating
                    </p>
                    <ReactStars
                        key={personalRating}
                        count={5}
                        value={personalRating}
                        onChange={changeRating}
                        edit={session?.user ? true : false}
                        size={34}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                    {!session?.user ? (
                        <div className="flex mb-3 space-x-4">
                            <h1 className="text-xl font-semibold text-font-color-light">
                                Please
                                <Link
                                    href={`/register?redirect=${recipeId}`}
                                    className="mx-1 underline"
                                >
                                    sign in
                                </Link>{' '}
                                to rate this recipe
                            </h1>
                        </div>
                    ) : null}
                    <div className="flex-col xl:flex">
                        <div className="px-3 py-6 bg-ingredient-background">
                            <h1 className="text-3xl font-black">Ingredients</h1>
                            <ul className="flex flex-col mt-6 space-y-2">
                                {recipe.ingredients?.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex flex-row items-center space-x-2"
                                    >
                                        <div className="flex flex-col items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-primary">
                                            <p>{index + 1}</p>
                                        </div>
                                        <p className="text-xl w-96 text-font-color-light">
                                            {ingredient.text}.
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h1 className="mt-12 text-2xl font-bold text-font-color-light">
                            Nutrients (per serving)
                        </h1>
                        {recipe.digest?.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row w-full p-2 px-6 my-2 bg-ingredient-background"
                            >
                                <p className="flex justify-start w-1/3 text-xl text-font-color-light">
                                    {item.label}
                                </p>
                                <p className="flex justify-center w-1/3 text-xl text-font-color-light">
                                    {(item.total / recipe.yield).toFixed(2)}{' '}
                                    {item.unit}
                                </p>
                                <p className="flex justify-end w-1/3 text-xl text-font-color-light">
                                    {(item.daily / recipe.yield).toFixed(2)} %
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default recipeDetails

const cloudinary = require('cloudinary').v2
import prisma from '../../lib/prismadb'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export async function getStaticProps(context) {
    const { recipeId } = context.params

    // get recipe from db
    const dbRecipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId,
        },
    })

    // calculate average rating and number of ratings
    if (dbRecipe) {
        const ratings = await prisma.rating.aggregate({
            where: {
                recipeId: recipeId,
            },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        })
        dbRecipe.avgRating = ratings._avg.rating
        dbRecipe.numRatings = ratings._count.rating
    }
    // get comments from db
    const dbComments = await prisma.comment.findMany({
        where: {
            recipeId,
        },
        include: {
            user: true,
            commentLikes: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    // group comments by parent
    let groupedComments = {}
    dbComments.forEach((comment) => {
        groupedComments[comment.parentId] =
            groupedComments[comment.parentId] || []
        groupedComments[comment.parentId].push(comment)
    })

    //return recipe from db if it exists
    if (dbRecipe) {
        return {
            props: {
                dbRecipe: dbRecipe,
                dbComments: groupedComments,
            },
            revalidate: 60 * 60 * 24,
        }
    }

    // get recipe from api if it doesn't exist in db
    const data = await fetch(
        process.env.APP_URL + '/api/edmamAPI?recipeId=' + recipeId
    ).then((res) => res.json())

    if (data?.recipes) {
        // Configuration
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        // Upload image to cloudinary
        const res = await cloudinary.uploader.upload(data.recipes.image, {
            public_id: `recipe/${recipeId}`,
            overwrite: true,
            invalidate: true,
            resource_type: 'image',
            folder: 'recipe',
            use_filename: true,
            unique_filename: true,
        })
        data.recipes.image = res.secure_url
        // Save recipe to database
        await prisma.recipe.create({
            data: {
                id: recipeId,
                label: data.recipes.label,
                yield: data.recipes.yield,
                image: data.recipes.image,
                totalTime: data.recipes.totalTime,
                cuisineType: data.recipes.cuisineType,
                mealType: data.recipes.mealType,
                dishType: data.recipes.dishType,
                ingredients: data.recipes.ingredients,
                healthLabels: data.recipes.healthLabels,
                digest: data.recipes.digest,
            },
        })
    }
    // return recipe
    return {
        props: {
            dbRecipe: data?.recipes || {},
            dbComments: groupedComments,
        },
        revalidate: 60 * 60 * 24,
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
