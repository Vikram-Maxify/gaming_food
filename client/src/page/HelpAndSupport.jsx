import React from 'react'
import help from '../assets/Images/helpImage1.avif'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HelpAndSupport = () => {
    return (
        <>
            {/* <Navbar className="block" /> */}
            <div className="relative">
                <img
                    src={help}
                    alt="Help Banner"
                    className="w-full object-cover h-60 md:h-80 lg:h-96"
                />

                <h1 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center px-4">
                    We would love to hear from you!
                </h1>
            </div>

            <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-10 flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10">

                {/* Left */}
                <div className="w-full lg:w-1/2 flex flex-col">

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none hover:border-red-300">
                        <option value="">I have an issue with my Foodie order.</option>
                        <option value="veg">My Foodie app is not working.</option>
                        <option value="nonveg">I want to share feedback or a suggestion.</option>
                    </select>

                    <form>
                        <input type="text" placeholder="Full Name"
                            className="outline-none border py-3 w-full rounded-md ps-3 hover:border-red-300 mt-6 md:mt-8"
                        />

                        <input type="email" placeholder="Enter Email"
                            className="outline-none border py-3 w-full rounded-md ps-3 hover:border-red-300 mt-6 md:mt-8"
                        />

                        <input type="number" placeholder="Mobile Number"
                            className="outline-none border py-3 w-full rounded-md ps-3 hover:border-red-300 mt-6 md:mt-8"
                        />

                        <textarea rows="5" placeholder="Type Text"
                            className="rounded-md ps-3 mt-6 md:mt-8 hover:border-red-300 w-full outline-none border pt-3"
                        ></textarea>

                        <button className="text-white text-lg font-medium mt-6 bg-red-400 rounded-lg py-3 px-4 w-full md:w-auto">
                            Submit Feedback
                        </button>
                    </form>
                </div>

                {/* Right */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">

                    <div className="w-full border shadow-md px-6 rounded-lg py-6 hover:border-red-300">
                        <h2 className="text-base font-semibold">Report a Safety Emergency</h2>
                        <p className="mt-2">
                            We are committed to the safety of everyone using Foodie.
                        </p>
                        <button className="text-base font-semibold mt-4 text-red-400">
                            Report here!
                        </button>
                    </div>

                    <div className="w-full border shadow-md px-6 rounded-lg py-6 mb-28 hover:border-red-300">
                        <h2 className="text-base font-semibold">Issue with your live order</h2>
                        <p className="mt-2 ">
                            Click on the 'Support' or 'Online ordering help' section in your app to connect to our customer support team.
                        </p>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default HelpAndSupport