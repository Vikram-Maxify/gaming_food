import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";




const Footer = () => {
    return (
        <>
            <div className="bg-black pt-16">

                <div className="w-full md:w-[80%] mx-auto px-4 mb-[86px] md:mb-0 hidden md:block">

                    {/* Title */}
                    <h1 className="text-white text-4xl font-semibold mb-6 text-center md:text-left">
                        Foodie
                    </h1>

                    <div className="flex flex-wrap justify-between gap-6 w-full mt-10">

                        {/* Column 1 */}
                        <div className="w-[45%] md:w-auto flex flex-col">
                            <h1 className="text-xl text-white">Eternal</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>About Us</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Foodie Corporate</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Career</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Team</Link>
                        </div>

                        {/* Column 2 */}
                        <div className="w-[45%] md:w-auto flex flex-col">
                            <h1 className="text-xl text-white">For Restaurants</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>Partner With Us</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Apps For You</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Restaurant Consulting</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Foodie Dineout</Link>
                        </div>

                        {/* Column 3 */}
                        <div className="w-[45%] flex flex-col md:w-auto">
                            <h1 className="text-xl text-white">Learn More</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>Privacy</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Security</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Terms of Service</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Help & Support</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Blog</Link>
                        </div>

                        {/* Column 4 (Social Links) */}
                        <div className="w-[45%] flex flex-col md:w-auto">
                            <h1 className="text-xl text-white">Social Links</h1>

                            {/* 👇 Inline icons */}
                            <div className="flex items-center gap-4 mt-3">
                                <Link to=""><FaLinkedin className='text-xl text-white hover:text-gray-300' /></Link>
                                <Link to=""><FaInstagram className='text-xl text-white hover:text-gray-300' /></Link>
                                <Link to=""><FaFacebookF className='text-xl text-white hover:text-gray-300' /></Link>
                                <Link to=""><FaTwitter className='text-xl text-white hover:text-gray-300' /></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer