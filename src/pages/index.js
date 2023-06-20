import Heading from "components/hero/Heading"
import HeroImage from "components/hero/HeroImage"
import SearchBar from "components/hero/SearchBar"
import Stats from "components/Stats"
import PopularRecipes from "components/PopularRecipes"
import WhatDoTheySay from "components/WhatDoTheySay"

export default function Home({ topRecipes }) {
  return (
    <>
      <div className="md:h-[100vh] 3xl:h-full">
        <div className="flex flex-col items-center lg:flex-row lg:mx-12 lg:ml-24 md:mt-24">
          <div className="z-10 w-full">
            <Heading />
            <SearchBar topRecipes={topRecipes} />
          </div>
          <div className="absolute right-0 hidden xl:block top-20">
            <HeroImage />
          </div>
        </div>
      </div>
      <Stats />
      <PopularRecipes topRecipes={topRecipes} />
      <WhatDoTheySay />
    </>
  )
}

import prisma from "../lib/prismadb"
export async function getStaticProps() {
  const topRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      label: true,
      image: true,
      cuisineType: true,
      totalTime: true,
      ratings: {
        orderBy: {
          rating: "desc",
        },
        select: {
          rating: true,
        },
      },
    },
    take: 3,
  })
  topRecipes.map((recipe) => {
    recipe.AvgRating = recipe.ratings.reduce((a, b) => a + b.rating, 0) / recipe.ratings.length || 0
    recipe.numberOfRatings = recipe.ratings.length
    delete recipe.ratings
  })
  return {
    props: {
      topRecipes: topRecipes || [],
    },
    revalidate: 60 * 60 * 24,
  }
}

