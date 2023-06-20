import React from 'react'
import CountUp from 'react-countup';
import Fade from 'react-reveal/Fade'

function Stats() {
    return (
        //  number statustice 3 big numbers
        <div className="flex justify-center items-center flex-wrap space-x-3 my-6 md:my-0 md:space-x-24 text-primary md:h-[50vh] 3xl:h-[30vh]">
            <div className="flex flex-col items-center">
                <Fade up>
                    <div className="flex items-center">
                        <CountUp className="text-3xl md:text-7xl font-black" end={2300000} separator="," enableScrollSpy={true} />
                        <span className="text-3xl md:text-7xl">+</span>
                    </div>
                    <p className="text-xl md:text-4xl text-font-color-light">Recipes</p>
                </Fade>
            </div>
            <div className="flex flex-col items-center">
                <Fade up delay={400}>
                    <div className="flex items-center">
                        <CountUp className="text-3xl md:text-7xl font-black" end={500} enableScrollSpy={true} />
                        <span className="text-3xl md:text-7xl">+</span>
                    </div>
                    <p className="text-xl md:text-4xl text-font-color-light">Top Recipe Sources</p>
                </Fade>
            </div>
            <div className="flex flex-col items-center">
                <Fade up delay={800}>
                    <div className="flex items-center">
                        <CountUp className="text-3xl md:text-7xl font-black" end={3} enableScrollSpy={true} />
                        <span className="text-3xl md:text-7xl"></span>
                    </div>
                    <p className="text-xl md:text-4xl text-font-color-light">Major Partners</p>
                </Fade>
            </div>
        </div>
    )
}

export default Stats