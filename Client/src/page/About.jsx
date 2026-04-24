import React from 'react'
import aboutImage from '../assets/Images/aboutImage.avif'
import Navbar from '../components/Navbar'

const About = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className="relative">
                    <img
                        src={aboutImage}
                        className="w-full object-cover h-80 md:h-[44rem]"
                        alt="About"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <h2 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-semibold text-center px-4 drop-shadow-lg">                        Reserve Your Spot, Dine Without Delay.
                    </h2>
                </div>
                <div className="flex w-[70%] gap-4 justify-center items-center mx-auto mt-20">
                    <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8">
                        <p className="text-base sm:text-lg md:text-2xl leading-relaxed text-justify">
                            Founded with a vision to simplify dining, <span className="font-bold">Foodies</span> is transforming the way people discover, book, and enjoy food. What started as a platform to connect users with restaurants has evolved into a seamless experience for table reservations, food ordering, and real-time dining solutions.
                        </p>
                    </div>
                    <div className="w-1/2 bg-blue-200">Right</div>
                </div>
            </div>
        </>
    )
}

export default About