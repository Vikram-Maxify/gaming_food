import React from 'react'
import help from '../assets/Images/helpImage1.avif'
import Navbar from '../components/Navbar'

const HelpAndSupport = () => {
    return (
        <>
            <Navbar />
            <div className="relative">
                <img
                    src={help}
                    alt="Help Banner"
                    className="w-full object-cover h-96"
                />

                <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold">
                    We would love to hear from you!
                </h1>
            </div>
        </>
    )
}

export default HelpAndSupport