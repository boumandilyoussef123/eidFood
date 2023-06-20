import React from 'react'
import Image from 'next/image'
import Fade from 'react-reveal/Fade'
import Link from 'next/link'

function Footer() {
    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-[50vh] 3xl:h-full sticky bottom-0 right-0 left-0">
            <Fade up>
                <div className="flex items-center space-x-10">
                    <Image width={128} height={128} src="/logo.png" alt="logo" />
                    <p className="text-4xl text-font-color-light">Recipes App</p>
                </div>
                <div className="flex items-center space-x-10">
                    <p className="text-2xl text-font-color-light">© 2021 Recipe App. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center space-x-5 md:space-x-10">
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/#popular-recipes`}
                        className="text-2xl cursor-pointer text-font-color-light"
                    >
                        Popular Recipes
                    </Link>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/#what-they-say`}
                        className="text-2xl cursor-pointer text-font-color-light"
                    >
                        What They Say
                    </Link>
                    <Link
                        href='https://github.com/Frd0mF/EidFood'
                        target={'_blank'}
                        className="text-2xl underline cursor-pointer text-font-color-light"
                    >
                        Github
                    </Link>
                </div>
            </Fade>
        </div>

    )
}

export default Footer