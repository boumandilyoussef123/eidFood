import SearchBar from "components/searchResults/SearchBar"
import ResultCard from "components/searchResults/ResultCard"
import Filters from "components/searchResults/Filters"
import { useEffect, useState } from "react"
import LoadingSkeleton from "components/searchResults/LoadingSkeleton"

function index({ recipes, total }) {

    const [isRefreshing, setIsRefreshing] = useState(true)
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        setIsRefreshing(false)
    }, [recipes])


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShowScrollToTop(true)
            }
            else {
                setShowScrollToTop(false)
            }
        })
        return () => window.removeEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShowScrollToTop(true)
            }
            else {
                setShowScrollToTop(false)
            }
        })
    }, [])


    return (
        <div className="flex flex-col items-center">
            <SearchBar setIsRefreshing={setIsRefreshing} />
            <p className="mb-12 -mt-12 xl:text-2xl text-font-color-light">Total results: {total} (Showing first 20 due to API limits)</p>
            <div className="flex flex-col items-start w-full md:flex-row">
                <div className="flex flex-col justify-center w-full h-full mb-12 xl:ml-16 xl:items-center md:w-3/12">
                    <Filters />
                </div>
                {
                    isRefreshing ?
                        <div className="flex flex-col space-y-10">
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </div>
                        :
                        <div className='w-full px-6'>
                            <>

                                {recipes.length === 0 && <p className="w-2/3 text-base text-center xl:text-2xl text-font-color-light">No recipes found or max requests reached</p>}
                                {recipes.map((recipe, index) => (
                                    <ResultCard
                                        key={index}
                                        recipe={recipe.recipe} />

                                ))}
                            </>
                            {
                                showScrollToTop &&
                                <div className="fixed bottom-0 right-0 mb-10 mr-10">
                                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </button>
                                </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default index

export async function getServerSideProps(context) {
    const { q, minCalories, maxCalories, health } = context.query
    let data = await fetch(process.env.APP_URL + '/api/edmamAPI?q=' + q + '&minCalories=' + (minCalories || '') + '&maxCalories=' + (maxCalories || '') + '&health=' + (health || ''))
        .then(res => res.json())

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            recipes: data.recipes || [],
            total: data.total || 0,
        }
    }
}