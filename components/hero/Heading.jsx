import React from 'react'
import Fade from 'react-reveal/Fade'

function Heading() {

    return (
        <div className="font-['Roboto'] text-font-color space-y-6">
            <Fade left>
                <h1 className="sm:text-2xl mt-6 sm:mt-0 lg:text-6xl xl:text-9xl font-bold">Food Recipes</h1>
                <p className="sm:text-4xl text-font-color-light">Helping you cook a variety of dishes from all over <br /> the world</p>
            </Fade>
        </div>

    )
}

export default Heading