import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";




const Footer = () => {
    return (
        <>
            <div className='bg-black'>

                <div className="w-full md:w-[60%] mx-auto flex flex-col px-4">

                    <h1 className="text-white text-4xl font-semibold mb-6 mt-16 md:mt-32 text-center md:text-left">
                        Foodie
                    </h1>
                    <div className="flex flex-wrap justify-between gap-6 w-full mt-10">
                        <div className="w-[45%] md:w-auto flex flex-col">
                            <h1 className="text-xl text-white">Eternal</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>About Us</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Foodie Corporate</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Career</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Team</Link>
                        </div>
                        <div className="w-[45%] md:w-auto  flex flex-col">
                            <h1 className="text-xl text-white">For Restaurants</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>Partner With Us</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Apps For You</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Restaurant<br /><spna>Consulting</spna></Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Foodie Dineout</Link>

                        </div>

                        <div className="w-[45%] flex flex-col md:w-auto">
                            <h1 className="text-xl text-white  flex flex-col">Learn More</h1>
                            <Link to="#" className='text-gray-400 mt-3 hover:text-white'>Privacy</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Security</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Terms of Service</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Help & Support</Link>
                            <Link to="#" className='text-gray-400 mt-1 hover:text-white'>Blog</Link>
                        </div>
                        <div className="w-[45%] flex flex-col md:w-auto">
                            <h1 className="text-xl text-white">Social Links</h1>
                            <Link to="" className='text-white mt-3 '><FaLinkedin className='text-xl' /></Link>
                            <Link to="" className='text-white mt-2 '><FaInstagram className='text-xl' /></Link>
                            <Link to="" className='text-white mt-2'><FaFacebookF className='text-xl' /></Link>
                            <Link to="" className='text-white mt-2'><FaTwitter className='text-xl' /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer