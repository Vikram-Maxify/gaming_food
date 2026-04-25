import React from 'react'
import aboutImage from '../assets/Images/aboutImage.avif'
import Navbar from '../components/Navbar'
import table from '../assets/Images/diningTable.avif'
import { GoGoal } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Footer from '../components/Footer';




const About = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div>
                <div className="relative">
                    <img
                        src={aboutImage}
                        className="w-full object-cover h-80 md:h-[44rem] rounded-md rounded-b-sm"
                        alt="About"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <h2 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-semibold text-center px-4 drop-shadow-lg">About Us !
                    </h2>
                    <h4 className='absolute inset-0 mt-20 flex items-center justify-center text-white text-lg md:text-2xl font-semibold text-center px-4 drop-shadow-lg'>Connecting you with the flavors you love, one delivery at a time.</h4>
                </div>

                <div className="flex flex-col md:flex-row items-center w-[95%] md:w-[75%]  mx-auto px-4 mt-16 gap-16">
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={table}
                            alt="Dining"
                            className="w-full h-70 md:h-96 object-cover rounded-xl"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-1/2">
                        <h1 className='font-semibold text-lg text-blue-600'>Who we are</h1>
                        <p className="text-lg md:text-xl leading-relaxed text-white mb-4 font-[Open_Sans] md:text-black">
                            Founded with a vision to simplify dining, <span className="font-semibold">Foodies</span> is transforming the way people discover, book, and enjoy food. What started as a platform to connect users with restaurants has evolved into a seamless experience for reservations and ordering.
                        </p>

                        <p className="text-lg md:text-xl leading-relaxed text- mb-4 font-[Open_Sans] md:text-black">
                            At its core, Foodies focuses on making dining effortless and accessible. With smart technology and a strong user experience, it brings customers and restaurants closer for smoother everyday experiences.
                        </p>

                        <div className='flex flex-row gap-10 mt-5'>
                            <h2 className='bg-green-200 text-blue-400 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white'>Fresh food</h2>
                            <h2 className='bg-red-200 py-2 px-4 text-red-400 rounded-md hover:bg-red-600 hover:text-white'>24/7 Support</h2>
                        </div>

                    </div>

                </div>
                <div className="w-[90%] md:w-[60%] mx-auto mt-28 mb-20">

                    <div className="flex justify-between items-center text-center">

                        <div>
                            <h1 className="text-2xl md:text-5xl font-bold text-blue-600">10000+</h1>
                            <p className="text-lg text-gray-500">Customers</p>
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-5xl font-bold text-orange-600">1000+</h1>
                            <p className="text-lg text-gray-500">Restaurants</p>
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-5xl font-bold text-green-600">50+</h1>
                            <p className="text-lg text-gray-500">Cities</p>
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-5xl font-bold text-violet-600">2M+</h1>
                            <p className="text-lg text-gray-500">Users</p>
                        </div>

                    </div>

                </div>
                <div className='text-center text-4xl text-blue-600 font-semibold'><h1 >Our Values</h1></div>
                <div className='mb-20'>
                    <div className="w-[95%] md:w-[75%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">

                        {/* Our Mission */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <GoGoal className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                                Our Mission
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                Our mission is to make dining simple, fast, and accessible for everyone by connecting people with the best food experiences around them.
                            </p>
                        </div>

                        {/* Our Community */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <BsFillPeopleFill className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                                Our Community
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                We believe in building a strong community of <br />food lovers and restaurants, creating meaningful connections that go beyond just ordering food.
                            </p>
                        </div>

                        {/* Our Passion */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <FaHeart className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                                Our Passion
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                Driven by passion for great food and technology<br /> we continuously innovate to deliver better, faster, and more delightful dining experiences.
                            </p>
                        </div>

                    </div>
                </div>
                <div className='text-center text-4xl text-blue-600 font-semibold'><h1 >Why Choose Foodie</h1></div>
                <div className='mb-32'>
                    <div className="w-[95%] md:w-[75%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">

                        {/* Our Mission */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <GoGoal className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                                A Smarter Way to Dine
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                We make discovering and ordering food effortless with a clean, intuitive interface. From browsing restaurants to placing orders or booking tables, every step is designed to be fast, simple, and hassle-free.
                            </p>
                        </div>

                        {/* Our Community */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <BsFillPeopleFill className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                                Seamless Food Experience
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                Get real-time updates on orders, availability, and reservations. Our platform ensures speed and reliability so you always know what’s happening — no delays, no confusion.
                            </p>
                        </div>

                        {/* Our Passion */}
                        <div className="px-8 py-8 rounded-xl border hover:border-2 shadow-lg hover:shadow-xl transition text-center">
                            <FaHeart className="text-blue-600 text-4xl mx-auto mb-4" />

                            <h2 className="text-xl font-semibold mb-3 text-black">
                               Next-Gen Food Ordering
                            </h2>

                            <p className="text-sm md:text-base md:text-gray-600 text-white leading-relaxed tracking-wide">
                                We bridge the gap between customers and restaurants, creating meaningful connections. Whether you're craving your favorite dish or managing your business, our platform supports both sides seamlessly.                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About