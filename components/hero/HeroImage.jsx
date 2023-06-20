import React from 'react'
import Image from 'next/image'
import Fade from 'react-reveal/Fade'

function HeroImage() {
    return (
        <div className="flex justify-center">
            <Fade right>
                <Image src="/hero-image.png" width={1000} height={1000} alt="hero image" />
            </Fade>
        </div>
    )
}

export default HeroImage