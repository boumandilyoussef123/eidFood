import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'

function Filters() {

    const router = useRouter()
    const intolerances = ['celery-free', 'crustacean-free', 'dairy-free', 'egg-free', 'fish-free', 'gluten-free', 'lupine-free', 'mustard-free', 'peanut-free', 'sesame-free', 'shellfish-free', 'soy-free', 'tree-nut-free', 'wheat-free']
    const [selectedIntolerances, setSelectedIntolerances] = useState([])

    const handleIntollerance = (intolerance) => {
        //if intolerance is already selected, remove it from the array
        const index = selectedIntolerances.indexOf(intolerance)
        if (index > -1) {
            selectedIntolerances.splice(index, 1)
            setSelectedIntolerances([...selectedIntolerances])
        }
        else {
            setSelectedIntolerances([...selectedIntolerances, intolerance])
        }
    }

    useEffect(() => {
        let query = router.query
        query[`health`] = selectedIntolerances
        router.push({
            pathname: '/search',
            query: query,
            shallow: true
        })
    }, [selectedIntolerances])

    const handleMinCalories = (e) => {
        //remove all non numeric characters
        const min = e.target.value.replace(/\D/g, '')
        let query = router.query
        query['minCalories'] = `${min}`

        router.push({
            pathname: '/search',
            query: query,
            shallow: true
        })
    }

    const handleMaxCalories = (e) => {
        //remove all non numeric characters
        const max = e.target.value.replace(/\D/g, '')
        let query = router.query
        query['maxCalories'] = `${max}`
        router.push({
            pathname: '/search',
            query: query,
            shallow: true
        })
    }

    const debounceMinCalories = debounce(handleMinCalories, 500)
    const debounceMaxCalories = debounce(handleMaxCalories, 500)

    return (

        <div className="flex flex-col items-center justify-center h-full space-y-10">
            <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/4">
                <p className="text-2xl xl:self-center text-font-color-light">Filters</p>
                <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/2">
                    <p className="text-xl underline text-font-color-light">Calories</p>
                    <div className="flex flex-col items-start justify-start w-full">
                        Min<input
                            onChange={debounceMinCalories}
                            type="number" className="w-1/2 h-10 pl-5 pr-1 text-xl bg-transparent border-2 rounded-md focus:outline-none text-font-color-light border-accent-primary" />
                        Max <input
                            onChange={debounceMaxCalories}
                            type="number" className="w-1/2 h-10 pl-5 pr-1 text-xl bg-transparent border-2 rounded-md focus:outline-none text-font-color-light border-accent-primary" />
                    </div>
                </div>
                <p className="text-xl underline text-font-color-light">Intolerances / Allergies</p>
                <div className="flex flex-col items-center justify-center w-full space-y-5 h-1/2">
                    <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/2">
                        {intolerances.map((intolerance, index) => {
                            return (
                                <div className="flex items-center justify-start w-full space-x-5" key={index}>
                                    <input type="checkbox"
                                        defaultChecked={selectedIntolerances.includes(intolerance)}
                                        className="w-5 h-5 accent-primary"
                                        onClick={() => {
                                            handleIntollerance(intolerance)
                                        }}
                                    />
                                    <p className="text-xl text-font-color-light first-letter:uppercase">{intolerance}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Filters