import React from 'react'
import { useSelector } from 'react-redux'
import aboutImage from '../assets/Images/aboutImage.avif'
import Navbar from '../components/Navbar'
import table from '../assets/Images/diningTable.avif'
import { GoGoal } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHeart, FaRegClock, FaTruck, FaCreditCard } from "react-icons/fa";
import { MdRestaurant, MdDeliveryDining, MdSecurity } from "react-icons/md";
import Footer from '../components/Footer';

const About = () => {
    // 🔥 Get settings from Redux
    const { settings } = useSelector((state) => state.settings);
    const siteTitle = settings?.title || "Foodzzy";

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
                
                {/* Hero Section */}
                <div className="relative">
                    <img
                        src={aboutImage}
                        className="w-full object-cover h-80 md:h-[32rem] lg:h-[36rem]"
                        alt="About"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
                            About {siteTitle}
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <h4 className="text-base md:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-lg animate-slide-up">
                            Connecting you with the flavors you love, one delivery at a time.
                        </h4>
                    </div>
                </div>

                {/* Who We Are Section */}
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                        
                        {/* Image */}
                        <div className="w-full md:w-1/2 group">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src={table}
                                    alt="Dining"
                                    className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-1.5 rounded-full mb-4">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="text-orange-600 text-sm font-semibold tracking-wide">Who We Are</span>
                            </div>
                            
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Welcome to <span className="text-orange-500">{siteTitle}</span>
                            </h1>
                            
                            <p className="text-gray-600 leading-relaxed mb-4 text-base">
                                Founded with a vision to simplify dining, <span className="font-semibold text-orange-600">{siteTitle}</span> is transforming the way people discover, book, and enjoy food. What started as a platform to connect users with restaurants has evolved into a seamless experience for reservations and ordering.
                            </p>

                            <p className="text-gray-600 leading-relaxed mb-6 text-base">
                                At its core, {siteTitle} focuses on making dining effortless and accessible. With smart technology and a strong user experience, it brings customers and restaurants closer for smoother everyday experiences.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-300 cursor-pointer">
                                    <FaTruck size={14} />
                                    Fresh Food
                                </span>
                                <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
                                    <FaRegClock size={14} />
                                    24/7 Support
                                </span>
                                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                                    <FaCreditCard size={14} />
                                    Secure Payment
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="transform hover:scale-105 transition duration-300">
                                <h1 className="text-3xl md:text-5xl font-bold text-white">10000+</h1>
                                <p className="text-orange-100 mt-2 font-medium">Happy Customers</p>
                            </div>
                            <div className="transform hover:scale-105 transition duration-300">
                                <h1 className="text-3xl md:text-5xl font-bold text-white">1000+</h1>
                                <p className="text-orange-100 mt-2 font-medium">Partner Restaurants</p>
                            </div>
                            <div className="transform hover:scale-105 transition duration-300">
                                <h1 className="text-3xl md:text-5xl font-bold text-white">50+</h1>
                                <p className="text-orange-100 mt-2 font-medium">Cities Covered</p>
                            </div>
                            <div className="transform hover:scale-105 transition duration-300">
                                <h1 className="text-3xl md:text-5xl font-bold text-white">2M+</h1>
                                <p className="text-orange-100 mt-2 font-medium">Active Users</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Values</h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">What drives us every day to serve you better</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Our Mission */}
                            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                                    <GoGoal className="text-orange-500 text-3xl group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our mission is to make dining simple, fast, and accessible for everyone by connecting people with the best food experiences around them.
                                </p>
                            </div>

                            {/* Our Community */}
                            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                                    <BsFillPeopleFill className="text-orange-500 text-3xl group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Our Community</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We believe in building a strong community of food lovers and restaurants, creating meaningful connections that go beyond just ordering food.
                                </p>
                            </div>

                            {/* Our Passion */}
                            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                                    <FaHeart className="text-orange-500 text-3xl group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Our Passion</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Driven by passion for great food and technology, we continuously innovate to deliver better, faster, and more delightful dining experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-gray-50 py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Why Choose {siteTitle}?</h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Experience the difference with our premium service</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5">
                                    <MdDeliveryDining className="text-white text-2xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">A Smarter Way to Dine</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We make discovering and ordering food effortless with a clean, intuitive interface. From browsing restaurants to placing orders or booking tables, every step is designed to be fast, simple, and hassle-free.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5">
                                    <MdSecurity className="text-white text-2xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Seamless Food Experience</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Get real-time updates on orders, availability, and reservations. Our platform ensures speed and reliability so you always know what's happening — no delays, no confusion.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5">
                                    <MdRestaurant className="text-white text-2xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-3">Next-Gen Food Ordering</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We bridge the gap between customers and restaurants, creating meaningful connections. Whether you're craving your favorite dish or managing your business, our platform supports both sides seamlessly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
            `}</style>
        </>
    )
}

export default About