import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaLinkedin, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdRestaurant, MdDeliveryDining, MdSecurity } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCreditCard } from "react-icons/bs";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    // 🔥 Get settings from Redux (same as Navbar)
    const { settings } = useSelector((state) => state.settings);

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black pt-16 pb-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Main Footer Content - Desktop */}
                <div className="hidden md:block">
                    {/* Brand Section */}
                    <div className="text-center md:text-left mb-12">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            {/* Logo - Same as Navbar */}
                            {settings?.logo ? (
                                <img
                                    src={settings.logo}
                                    alt={settings.title}
                                    className="w-12 h-12 object-contain rounded-xl"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <MdRestaurant className="text-white text-2xl" />
                                </div>
                            )}
                            
                            {/* Title - Same as Navbar */}
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {settings?.title || "Foodzzy"}
                            </h1>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Delivering happiness to your doorstep. Order your favorite food from the best restaurants in town.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-4 gap-8 mb-12">
                        {/* Column 1 - Company */}
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                                Company
                                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group">About Us</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">{settings?.title || "Foodzzy"} Corporate</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Careers</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Team</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 - For Restaurants */}
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                                For Restaurants
                                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Partner With Us</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Apps For You</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Restaurant Consulting</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">{settings?.title || "Foodzzy"} Dineout</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 - Learn More */}
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                                Learn More
                                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li><Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Privacy Policy</Link></li>
                                <li><Link to="/security" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Security</Link></li>
                                <li><Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Terms of Service</Link></li>
                                <li><Link to="/help" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Help & Support</Link></li>
                                <li><Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Column 4 - Social & Contact */}
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
                                Connect With Us
                                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></div>
                            </h3>
                            
                            {/* Social Icons */}
                            <div className="flex gap-3 mb-6">
                                <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                                    <FaLinkedin size={18} />
                                </Link>
                                <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                                    <FaInstagram size={18} />
                                </Link>
                                <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                                    <FaFacebookF size={18} />
                                </Link>
                                <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                                    <FaTwitter size={18} />
                                </Link>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                    <HiOutlineLocationMarker className="text-orange-500" />
                                    India
                                </p>
                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                    <BsCreditCard className="text-orange-500" />
                                    Secure Payments
                                </p>
                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                    <MdDeliveryDining className="text-orange-500" />
                                    Free Delivery on orders ₹499+
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="md:hidden">
                    {/* Brand Section */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            {/* Logo - Same as Navbar */}
                            {settings?.logo ? (
                                <img
                                    src={settings.logo}
                                    alt={settings.title}
                                    className="w-10 h-10 object-contain rounded-xl"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                    <MdRestaurant className="text-white text-xl" />
                                </div>
                            )}
                            
                            {/* Title - Same as Navbar */}
                            <h1 className="text-2xl font-bold text-white">
                                {settings?.title || "Foodzzy"}
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm">Delivering happiness to your doorstep</p>
                    </div>

                    {/* Accordion Style Links */}
                    <div className="space-y-4 mb-8">
                        <div className="border-b border-gray-800 pb-3">
                            <h3 className="text-white font-semibold mb-2">Company</h3>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/about" className="text-gray-400 text-sm hover:text-orange-500">About</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Corporate</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Careers</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Team</Link>
                            </div>
                        </div>
                        <div className="border-b border-gray-800 pb-3">
                            <h3 className="text-white font-semibold mb-2">For Restaurants</h3>
                            <div className="flex flex-wrap gap-3">
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Partner</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Apps</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Consulting</Link>
                                <Link to="#" className="text-gray-400 text-sm hover:text-orange-500">Dineout</Link>
                            </div>
                        </div>
                        <div className="border-b border-gray-800 pb-3">
                            <h3 className="text-white font-semibold mb-2">Learn More</h3>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/privacy" className="text-gray-400 text-sm hover:text-orange-500">Privacy</Link>
                                <Link to="/security" className="text-gray-400 text-sm hover:text-orange-500">Security</Link>
                                <Link to="/terms" className="text-gray-400 text-sm hover:text-orange-500">Terms</Link>
                                <Link to="/help" className="text-gray-400 text-sm hover:text-orange-500">Help</Link>
                            </div>
                        </div>
                    </div>

                    {/* Social Icons - Mobile */}
                    <div className="flex justify-center gap-4 mb-6">
                        <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                            <FaLinkedin size={16} />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                            <FaInstagram size={16} />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                            <FaFacebookF size={16} />
                        </Link>
                        <Link to="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                            <FaTwitter size={16} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 mt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-4 text-sm">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Amex_logo.svg/1200px-Amex_logo.svg.png" 
                                alt="amex" 
                                className="h-6 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                                alt="visa" 
                                className="h-6 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" 
                                alt="mastercard" 
                                className="h-6 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PayPal_logo.svg/1200px-PayPal_logo.svg.png" 
                                alt="paypal" 
                                className="h-6 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <p className="text-gray-500 text-sm text-center">
                            &copy; {currentYear} {settings?.title || "Foodzzy"}. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-xs">
                            <Link to="#" className="text-gray-500 hover:text-gray-400">Sitemap</Link>
                            <Link to="#" className="text-gray-500 hover:text-gray-400">Accessibility</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer