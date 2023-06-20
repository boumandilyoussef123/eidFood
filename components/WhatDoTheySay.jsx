import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import Image from 'next/image'

function WhatDoTheySay() {

    const [testemonials, setTestemonials] = useState([])
    const randomTestemonial = [
        'EidFood has really helped our business. Definitely worth the investment. Thank you!',
        'EidFood has helped my team and I stay on the same page. Previously, we were all over the board. Using EidFood has definitely saved us time and money.',
        'EidFood has been a game changer for our business. We now have a clear vision of our goals and how to achieve them. Thank you!',
        'I love anything that I purchase with the help of EidFood!',
        'Would definitely recommend EidFood and will definitely be using again.',
        'EidFood makes me more productive and gets the job done in a fraction of the time. I\'m glad I found EidFood.',
        'I have tried a lot of similar products and EidFood is the best!',
        'I have been using EidFood for over a year now and I love it! I can\'t imagine life without it. It\'s so easy to use, and the customer service is great.',
        'EidFood has made a huge difference!',
        'EidFood is exactly what I\'ve been looking for.'
    ]

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=6&select=firstName,lastName,image')
            .then(res => res.json())
            .then(
                (result) => {
                    //add random testemonial to each user
                    result?.users?.map((user, index) => {
                        user.testemonial = randomTestemonial[index]
                    })
                    setTestemonials(result.users)

                }
            );
    }, [])

    return (
        // what do they say
        <div
            id="what-they-say"
            className="flex flex-col items-center justify-center my-12 2xl:h-[100vh] 3xl:h-full">
            <h1 className="text-3xl font-bold lg:text-5xl text-font-color-light my-36">What do they say about us?</h1>
            <div className="grid w-10/12 grid-cols-1 gap-20 md:grid-cols-2 place-items-start lg:grid-cols-3">
                {
                    testemonials?.map((user, index) => (
                        <Fade
                            key={user?.id}
                            {...(index === 0 ? { left: true } : index === 1 ? { bottom: true } : index === 2 ? { right: true } : { bottom: true })}
                        >
                            <div className="flex flex-col items-center justify-center w-10/12 px-6 mx-auto mb-6 space-y-5">
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                    <Image
                                        width={100}
                                        height={100}
                                        className='object-cover w-full h-full rounded-full'
                                        src={user?.image} alt="user" />
                                </div>
                                <p className="text-xl font-bold text-font-color-light">{user?.firstName + ' ' + user?.lastName}</p>
                                <p className="text-base text-font-color-light">{user?.testemonial}</p>
                            </div>
                        </Fade>
                    ))
                }
            </div>
        </div>
    )
}

export default WhatDoTheySay