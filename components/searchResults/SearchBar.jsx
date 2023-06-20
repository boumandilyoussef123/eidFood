import React, { useState } from 'react'
import { useRouter } from 'next/router'
function SearchBar({ setIsRefreshing }) {

    const router = useRouter()
    const [query, setQuery] = useState(router.query.q || '')

    const submit = (e) => {
        e.preventDefault()
        setIsRefreshing(true)
        router.push({
            pathname: '/search',
            query: { q: query },
            shallow: true
        })
    }
    return (
        <form
            onSubmit={submit}
            className="flex flex-col justify-cente font-['Roboto'] my-12 px-2 md:px-12 py-6 w-full md:w-10/12 xl:w-[1000px] 3xl:w-[50vw]">
            <div className="flex flex-col justify-center">
                <p className="md:text-2xl 3xl:text-4xl text-font-color-light">Search for your favorite recipes</p>
            </div>
            <div className="relative mt-2 text-gray-600 drop-shadow-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 3xl:pl-6">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 3xl:w-12 3xl:h-12"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search" className="w-full px-3 py-4 pl-10 text-sm font-bold bg-transparent border-2 rounded-md 3xl:py-8 3xl:pl-24 3xl:text-2xl border-input-color focus:outline-none" />
                <button className="absolute top-0 right-0 px-6 py-3.5 mt-0.5 rounded-r-md text-white bg-primary hover:bg-primary-hover border-input-color 3xl:px-12 ring-2 ring-input-color 3xl:py-8 3xl:text-2xl">Search</button>
            </div>
        </form>
    )
}

export default SearchBar