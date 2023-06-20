import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

function index() {
    const [recipe, setRecipe] = useState({
        label: '',
        yield: '',
        image: '',
        totalTime: '',
        cuisineType: [],
        mealType: [],
        dishType: [],
        ingredients: [],
        healthLabels: [],
        digest: [],
    })

    const ingredientRef = useRef([])
    const [preIngredientAdd, setPreIngredientAdd] = useState({
        food: '',
        image: '',
        text: '',
    })
    const [preHealthLabelAdd, setPreHealthLabelAdd] = useState('')
    const recipeImageRef = useRef(null)
    const [preNutrientAdd, setPreNutrientAdd] = useState({
        nutrient: '',
        amount: '',
        unit: '',
        daily: '',
    })

    const handleSave = async () => {
        console.log(recipe)
        //check if all required fields are filled
        if (
            recipe.label === '' ||
            recipe.yield === '' ||
            recipe.totalTime === '' ||
            recipe.cuisineType.length === 0 ||
            recipe.mealType.length === 0 ||
            recipe.dishType.length === 0 ||
            recipe.ingredients.length === 0 ||
            recipe.healthLabels.length === 0 ||
            recipe.digest.length === 0
        ) {
            toast.error('Please fill all required fields')
            return
        }
        const res = await fetch('/api/create-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipe }),
        })
        const data = await res.json()
        if (data.message === 'recipe added') {
            toast.success('Recipe added')
        } else {
            toast.error('Error adding recipe')
        }
    }

    return (
        <div className="grid justify-end grid-cols-12 my-12">
            <div className="col-span-8">
                <div className="flex flex-col">
                    <div className="flex flex-col items-start">
                        <input
                            value={recipe.label}
                            onChange={(e) =>
                                setRecipe({ ...recipe, label: e.target.value })
                            }
                            type="text"
                            placeholder="Recipe Name"
                            className="h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none w-96 text-font-color-light border-primary"
                        />
                        <h3 className="ml-3 text-2xl text-font-color-light">
                            (
                            <span className="text-primary">
                                <input
                                    value={recipe.yield}
                                    onChange={(e) =>
                                        setRecipe({
                                            ...recipe,
                                            yield: e.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder="Number of servings"
                                    className="w-64 h-12 px-4 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                                />
                            </span>
                            Servings)
                        </h3>
                    </div>
                    <div className="flex flex-row my-3 space-x-12">
                        <div className="flex flex-col items-center w-1/4 mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">
                                Total time
                            </p>
                            <input
                                value={recipe.totalTime}
                                onChange={(e) =>
                                    setRecipe({
                                        ...recipe,
                                        totalTime: e.target.value,
                                    })
                                }
                                type="time"
                                placeholder="Total time"
                                className="w-full h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                        </div>
                        <div className="flex flex-col items-center w-1/4 mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">
                                Cuisine type
                            </p>
                            <input
                                value={recipe.cuisineType}
                                onChange={(e) =>
                                    setRecipe({
                                        ...recipe,
                                        cuisineType: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder="Cuisine type"
                                className="w-full h-12 px-4 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                        </div>
                        <div className="flex flex-col items-center w-1/4 mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">
                                Meal type
                            </p>
                            <input
                                value={recipe.mealType}
                                onChange={(e) =>
                                    setRecipe({
                                        ...recipe,
                                        mealType: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder="Meal type"
                                className="w-full h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                        </div>
                        <div className="flex flex-col items-center w-1/4 mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">
                                Dish type
                            </p>
                            <input
                                value={recipe.dishType}
                                onChange={(e) =>
                                    setRecipe({
                                        ...recipe,
                                        dishType: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder="Dish type"
                                className="w-full h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 space-x-12">
                        {recipe.ingredients.map((ingredient) => {
                            return (
                                <div className="flex flex-col items-center justify-center bg-ingredient-background w-fit h-fit">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={ingredient.image}
                                            className="w-48 h-48 rounded-full"
                                        />
                                        <p className="h-12 px-4 mb-3 text-2xl text-center bg-transparent border-b-2 outline-none w-36 text-font-color-light">
                                            {ingredient.name}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newIngredients =
                                                recipe.ingredients.filter(
                                                    (ing) =>
                                                        ing.name !==
                                                        ingredient.name
                                                )
                                            setRecipe({
                                                ...recipe,
                                                ingredients: newIngredients,
                                            })
                                        }}
                                        className="w-64 py-2 text-white bg-primary"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                        <div className="flex flex-col items-center justify-center bg-ingredient-background w-fit h-fit">
                            <input
                                ref={ingredientRef}
                                onChange={(e) =>
                                    setPreIngredientAdd({
                                        ...preIngredientAdd,
                                        image: URL.createObjectURL(
                                            e.target.files[0]
                                        ),
                                    })
                                }
                                type="file"
                                className="hidden"
                                id="file"
                                accept="image/*"
                            />
                            {preIngredientAdd.image ? (
                                <img
                                    onClick={() =>
                                        ingredientRef.current.click()
                                    }
                                    src={preIngredientAdd.image}
                                    className="w-48 h-48 rounded-full"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center w-48 h-48">
                                    <p
                                        onClick={() =>
                                            ingredientRef.current.click()
                                        }
                                        className="text-xl cursor-pointer text-font-color-light"
                                    >
                                        Upload image
                                    </p>
                                </div>
                            )}
                            <input
                                value={preIngredientAdd.food}
                                onChange={(e) =>
                                    setPreIngredientAdd({
                                        ...preIngredientAdd,
                                        food: e.target.value,
                                        text: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder="Ingredient"
                                className="h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none w-36 text-font-color-light border-primary"
                            />
                            <button
                                onClick={() => {
                                    setRecipe({
                                        ...recipe,
                                        ingredients: [
                                            ...recipe.ingredients,
                                            {
                                                image: preIngredientAdd.image,
                                                name: preIngredientAdd.food,
                                                text: preIngredientAdd.text,
                                            },
                                        ],
                                    })
                                    setPreIngredientAdd({
                                        image: null,
                                        food: '',
                                        text: '',
                                    })
                                }}
                                className="w-64 py-2 text-white bg-primary"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-12">
                        <h1 className="text-2xl font-bold text-font-color-light">
                            Health Labels
                        </h1>
                        <div className="flex flex-wrap">
                            {recipe.healthLabels.map((label) => {
                                return (
                                    <div className="flex items-center mx-1 my-2 text-xl rounded-full text-font-color-light bg-primary">
                                        <p className="px-4 py-1">{label}</p>
                                    </div>
                                )
                            })}
                            <div className="mx-1 my-2 text-xl rounded-full text-font-color-light bg-primary">
                                {' '}
                                <input
                                    value={preHealthLabelAdd}
                                    onChange={(e) =>
                                        setPreHealthLabelAdd(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Dish type"
                                    className="h-12 px-4 text-2xl bg-transparent outline-none w-36 text-font-color-light"
                                />
                                <button
                                    onClick={() => {
                                        setRecipe({
                                            ...recipe,
                                            healthLabels: [
                                                ...recipe.healthLabels,
                                                preHealthLabelAdd,
                                            ],
                                        })
                                        setPreHealthLabelAdd('')
                                    }}
                                    className="w-16 h-12 text-white"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <input
                            onChange={(e) =>
                                setRecipe({
                                    ...recipe,
                                    image: URL.createObjectURL(e.target.files[0]),
                                })
                            }
                            ref={recipeImageRef}
                            type="file" className="hidden" id="file" accept='image/*' />
                        <div className="flex flex-col items-center justify-center h-64 mb-6 w-80 bg-ingredient-background">
                            {recipe.image ? (
                                <img
                                    src={recipe.image}
                                    className="object-contain h-64 w-80"
                                    onClick={() => recipeImageRef.current.click()}
                                />
                            ) : (
                                <p
                                    onClick={() => recipeImageRef.current.click()}
                                    className="text-xl cursor-pointer text-font-color-light">
                                    Upload image
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {/* <div className="px-3 py-6 bg-ingredient-background">
                            <h1 className="text-3xl font-black">Ingredients</h1>
                            <ul className="flex flex-col mt-6 space-y-2">
                                {recipe.ingredients.map((ingredient) => {
                                    return (
                                        <li className="flex flex-row items-center space-x-2">
                                            <div className="flex flex-col items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-primary">
                                                <p>{ }</p>
                                            </div>
                                            <p className="text-xl w-96 text-font-color-light">
                                                {ingredient.name}
                                            </p>
                                        </li>
                                    )
                                })}
                                <li className="flex flex-row items-center space-x-2">
                                    <div className="flex flex-col items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-primary">
                                        <p>{recipe?.ingredients?.length + 1}</p>
                                    </div>
                                    <input
                                        value={preIngredientAdd.text}
                                        onChange={(e) =>
                                            setPreIngredientAdd({
                                                ...preIngredientAdd,
                                                text: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Ingredient"
                                        className="h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none w-96 text-font-color-light border-primary"
                                    />
                                    <button 
                                    onClick={() => {
                                        setRecipe({
                                            ...recipe,
                                            ingredients: [
                                                ...recipe.ingredients,
                                                {
                                                    image: preIngredientAdd.image,
                                                    name: preIngredientAdd.text,
                                                },
                                            ],
                                        })
                                        setPreIngredientAdd({
                                            image: null,
                                            text: '',
                                        })
                                    }}
                                    className="w-12 h-12 rounded-full bg-primary">
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div> */}
                        <h1 className="mt-12 text-2xl font-bold text-font-color-light">
                            Nutrients (per serving)
                        </h1>
                        {recipe.digest.map((nutrient) => {
                            return (
                                <div className="flex flex-row w-full p-2 px-6 my-2 space-x-3 bg-ingredient-background">
                                    <p className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary">
                                        {nutrient.name}
                                    </p>
                                    <p className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary">
                                        {nutrient.amount}
                                    </p>
                                    <p className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary">
                                        {nutrient.unit}
                                    </p>
                                    <p className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary">
                                        {nutrient.daily}%
                                    </p>
                                </div>
                            )
                        })}
                        <div className="flex flex-row w-full p-2 px-6 my-2 space-x-3 bg-ingredient-background">
                            <input
                                value={preNutrientAdd.name}
                                onChange={(e) => setPreNutrientAdd({ ...preNutrientAdd, name: e.target.value })}
                                type="text"
                                placeholder="Nutrient"
                                className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                            <input
                                value={preNutrientAdd.amount}
                                onChange={(e) => setPreNutrientAdd({ ...preNutrientAdd, amount: e.target.value })}
                                type="text"
                                placeholder="Amount"
                                className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                            <input
                                value={preNutrientAdd.unit}
                                onChange={(e) => setPreNutrientAdd({ ...preNutrientAdd, unit: e.target.value })}
                                type="text"
                                placeholder="Unit"
                                className="w-32 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                            <input
                                value={preNutrientAdd.daily}
                                onChange={(e) => setPreNutrientAdd({ ...preNutrientAdd, daily: e.target.value })}
                                type="text"
                                placeholder="Percentage"
                                className="w-40 h-12 px-4 mb-3 text-2xl bg-transparent border-b-2 outline-none text-font-color-light border-primary"
                            />
                            <button
                                onClick={() => {
                                    setRecipe({
                                        ...recipe,
                                        digest: [
                                            ...recipe.digest,
                                            {
                                                name: preNutrientAdd.name,
                                                amount: preNutrientAdd.amount,
                                                unit: preNutrientAdd.unit,
                                            },
                                        ],
                                    })
                                    setPreNutrientAdd({
                                        name: '',
                                        amount: '',
                                        unit: '',
                                    })
                                }}
                                className="w-12 h-12 rounded-full bg-primary">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-10"></div>
            <div className="flex flex-row justify-center order-12 w-full px-4 py-2 bg-primary">
                <button
                    onClick={() => {
                        handleSave()
                    }}
                    className="px-4 py-2 text-xl text-white">Save</button>
            </div>
        </div>
    )
}

export default index
