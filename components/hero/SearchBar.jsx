import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import { useRouter } from 'next/router'
import Link from 'next/link'

function SearchBar({ topRecipes }) {

    const [query, setQuery] = useState('')
    const router = useRouter()

    const searchRecipes = (e) => {
        e.preventDefault()
        router.push({
            pathname: '/search',
            query: { q: query },
            shallow: true
        })
    }
    return (
        <Fade left delay={300}>
            <form
                onSubmit={searchRecipes}
                className="flex flex-col justify-center md:bg-white font-['Roboto'] mt-12 px-2 md:px-12 py-6 xl:w-[1000px] 3xl:w-[50vw]">
                <div className="flex flex-col justify-center">
                    <p className="md:text-2xl 3xl:text-4xl text-font-color-light">Search for your favorite recipes</p>
                </div>
                <div className="relative mt-2 text-gray-600">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 3xl:pl-6">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 3xl:w-12 3xl:h-12"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </span>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        type="search" className="w-full px-3 py-4 pl-10 text-sm font-bold 3xl:py-8 3xl:pl-24 3xl:text-2xl bg-input-color focus:outline-none" />
                    <button className="absolute right-0 top-0 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 3xl:px-12 3xl:py-8 3xl:text-2xl">Search</button>
                </div>
                {/* popular recipes */}
                <div className="flex flex-col justify-center mt-4">
                    <p className="text-xl 3xl:text-2xl text-font-color-light">Popular Recipes</p>
                    <div className="flex mt-4 space-x-2">
                        {
                            topRecipes.map((recipe, index) => (
                                <Link
                                    href={`/recipe/${recipe.id}`}
                                    key={index} className="text-base truncate cursor-pointer 3xl:text-2xl text-primary">{recipe.label}</Link>
                            ))
                        }
                    </div>
                </div>
            </form>
        </Fade>

    )
}

export default SearchBar