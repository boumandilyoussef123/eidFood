import React from 'react'
import { BsClockHistory, BsArrowRight } from 'react-icons/bs'
import { RxDash } from 'react-icons/rx'
import { RiAlarmWarningLine } from 'react-icons/ri'
import Link from 'next/link'
import toHoursAndMinutes from 'helpers/toHoursAndMinutes'

function ResultCard({ recipe }) {

    const { hours, minutes } = toHoursAndMinutes(recipe?.totalTime);

    return (
        <>
            <div className="flex flex-col xs:flex-row sm:items-start items-center space-y-6 max-w-5xl sm:space-x-4 duration-500 ease-in-out xl:justify-between hover:drop-shadow-2xl">
                <div className="flex flex-col items-start justify-center w-full xl:w-[900px] h-full">
                    <h1 className="w-11/12 text-2xl font-bold xl:text-4xl text-primary">{recipe?.label}</h1>
                    <h3 className='ml-3 text-xl xl:text-2xl text-font-color-light'>({recipe.yield} Servings)</h3>
                    <div className="flex flex-col sm:flex-row items-center mt-3 space-x-2">
                        {(hours || minutes) ?
                            <div className='flex space-x-2 items-center'>
                                <BsClockHistory className="text-xl xl:text-2xl text-font-color-light" />
                                <p className="text-xl text-font-color-light">Ready in <span className={!hours ? 'hidden' : ''}>{hours} hour</span> <span className={!minutes ? 'hidden' : ''}>{minutes} minutes</span></p>
                            </div>
                            : null}
                        {recipe.cautions?.length ?
                            <div className='flex space-x-2 items-center'>
                                <RiAlarmWarningLine className="text-xl xl:text-2xl text-font-color-light" />
                                {recipe.cautions.map((caution, index) => {
                                    return (
                                        <p className='text-xl underline text-font-color-light' key={index}>{caution}</p>
                                    )
                                })
                                }
                            </div>
                            : null
                        }
                    </div>

                    <div className="flex items-center mt-3 sm:ml-4 space-x-2">
                        <RxDash className="text-xl xl:text-2xl text-font-color-light" />
                        <p className="text-base xl:text-xl text-font-color-light">Cuisine type: {recipe.cuisineType}</p>
                    </div>
                    <div className="flex items-center sm:ml-4 space-x-2">
                        <RxDash className="text-xl xl:text-2xl text-font-color-light" />
                        <p className="text-base xl:text-xl text-font-color-light">Meal type: {recipe.mealType}</p>
                    </div>
                    <div className="flex items-center sm:ml-4 space-x-2">
                        <RxDash className="text-xl xl:text-2xl text-font-color-light" />
                        <p className="text-base xl:text-xl text-font-color-light">Dish type: {recipe.dishType}</p>
                    </div>

                    <div className="flex items-center justify-between w-full mt-6 xl:w-9/12 xl:mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl xl:text-2xl text-font-color-light">Calories</h3>
                            <h3 className="text-base xl:text-xl text-font-color-light">{(recipe.calories / recipe.yield).toFixed(0)}Kj</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl xl:text-2xl text-font-color-light">Protein</h3>
                            <h3 className="text-base xl:text-xl text-font-color-light">{(recipe.totalNutrients?.PROCNT.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl xl:text-2xl text-font-color-light">Fat</h3>
                            <h3 className="text-base xl:text-xl text-font-color-light">{(recipe.totalNutrients?.FAT.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-xl xl:text-2xl text-font-color-light">Carbs</h3>
                            <h3 className="text-base xl:text-xl text-font-color-light">{(recipe.totalNutrients?.CHOCDF.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-end w-7/12 sm:w-4/12 h-full sm:my-auto">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className='rounded-md shadow-xl xl:w-[256px]'
                            src={recipe.image} alt={recipe.label} />
                        {recipe.dietLabels &&
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                                {recipe.dietLabels[0] && <button className="xl:text-[0.8vi] px-4 py-2 font-semibold text-white rounded-full focus:outline-none hover:bg-font-color-light active:shadow-none bg-font-color">{recipe.dietLabels[0]}</button>}
                                {recipe.dietLabels[1] && <button className="xl:text-[0.8vi] px-4 py-2 font-semibold text-white rounded-full focus:outline-none hover:bg-font-color-light active:shadow-none bg-font-color">{recipe.dietLabels[1]}</button>}
                            </div>
                        }
                    </div>
                </div>
            </div >
            <a
                href={recipe.uri ? `/recipe/${recipe?.uri?.split('#')[1]}` : `/recipe/${recipe.id}`} className="flex items-center justify-center w-32 mt-6 text-xl duration-300 text-primary hover:text-primary-hover hover:scale-105 hover:drop-shadow-xl">
                More Details
            </a>
            <span className="flex items-center mx-auto justify-center w-2/3 h-0.5 mt-6 mb-12 bg-font-color"></span>
        </>
    )
}

export default ResultCard