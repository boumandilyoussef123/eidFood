import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Fade from 'react-reveal/Fade'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Router from "next/router"


function Navbar() {

    const [isLoading, setIsLoading] = useState(false);


    Router.onRouteChangeStart = url => {
        setIsLoading(true);
    }

    Router.onRouteChangeComplete = () => {
        setIsLoading(false);
    }

    Router.onRouteChangeError = () => {
        setIsLoading(false);
    }

    const menuRef = useRef()
    const { data: session } = useSession();
    const [menuAnimation, setMenuAnimation] = useState({
        top: true,
        left: false,
    })
    const handleMobileMenu = () => {
        menuRef.current?.classList?.toggle('hidden')
        setMenuAnimation({
            top: !menuAnimation.top,
            left: !menuAnimation.left,
        })
    }
    const router = useRouter();
    return (
        <nav>
            <Fade
                {...menuAnimation}
            >
                <div
                    className="relative flex items-center justify-between h-16 text-xl text-black"
                    role="navigation"
                >
                    <Link href="/" className="lg:pl-8">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={72}
                            height={72}
                            className="w-10 sm:w-full"
                        />
                    </Link>
                    <div
                        className="px-4 cursor-pointer md:hidden"
                        onClick={handleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </div>
                    <div className="hidden w-full lg:pr-8 md:flex lg:w-fit">
                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/#popular-recipes`}
                            className="p-4 link link-underline link-underline-black"
                        >
                            Popular Recipes
                        </Link>
                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/#what-they-say`}
                            className="p-4 link link-underline link-underline-black "
                        >
                            What They Say
                        </Link>
                        {
                            session ? (
                                <div className='flex items-center space-x-3'>
                                    <img src={session.user.image} alt="user image" className="rounded-full w-14 h-14" />
                                    <Link href="/profile">
                                        <button className="p-4 link link-underline link-underline-black">
                                            Profile
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="p-4 text-white rounded bg-primary hover:bg-primary-hover"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) :
                                router.pathname !== '/register' ? (
                                    <Link
                                        href="/register"
                                        className="p-4 text-white rounded bg-primary hover:bg-primary-hover"
                                    >
                                        Register
                                    </Link>)
                                    : null
                        }
                    </div>
                </div>
                {/* mobile menu */}
                <div
                    className='hidden md:hidden'
                    ref={el => menuRef.current = el}>
                    {
                        session && (
                            <div className='flex items-center px-4 space-x-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white'>
                                <img src={session.user.image} alt="user image" className="w-8 h-8 rounded-full" />
                                <Link href="/profile">
                                    <button className="p-4">
                                        Profile
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/#popular-recipes`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        Popular Recipes
                    </Link>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/#what-they-say`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        What They Say
                    </Link>
                    {
                        session ? (
                            <button
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                            >
                                Logout
                            </button>
                        ) :
                            router.pathname !== '/register' ? (
                                <div
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                                >
                                    <Link
                                        href="/register"
                                        className='p-2 text-white rounded bg-primary hover:bg-primary-hover'
                                    >
                                        Register
                                    </Link>
                                </div>)
                                : null
                    }
                </div>
            </Fade>
            {
                isLoading && (
                    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full min-h-full bg-black bg-opacity-25">
                        <div className="flex items-center justify-center min-h-full">
                            <svg
                                className="w-10 h-10 animate-spin text-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar

