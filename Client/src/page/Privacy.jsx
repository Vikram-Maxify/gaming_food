import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaShieldAlt, FaLock, FaCookie, FaUserShield, FaDatabase, FaEdit } from 'react-icons/fa'
import { MdPrivacyTip, MdSecurity, MdDelete } from 'react-icons/md'

const PrivacyPolicy = () => {
    // 🔥 Get settings from Redux
    const { settings } = useSelector((state) => state.settings);
    const siteTitle = settings?.title || "Foodzzy";

    const sections = [
        {
            icon: FaShieldAlt,
            title: "Information We Collect",
            content: "We may collect the following types of information:",
            points: [
                "Personal information such as your name, email address, and phone number during registration and usage of the platform.",
                "Location data to help you find nearby restaurants, offers, and services based on your current or selected area.",
                "Payment-related information required for processing transactions securely through trusted payment providers."
            ],
            footer: "This information helps us provide and improve our services."
        },
        {
            icon: FaDatabase,
            title: "How We Use Your Information",
            points: [
                "We use your data to process food orders, table bookings, and transactions smoothly without delays.",
                "Your information helps us personalize your experience by showing relevant restaurants and offers.",
                "We may send important updates such as booking confirmations, order status, and notifications.",
                "We analyze user behavior to improve platform performance, features, and overall experience."
            ]
        },
        {
            icon: MdPrivacyTip,
            title: "Data Sharing and Disclosure",
            content: "We only share your information when necessary:",
            points: [
                "With restaurants to fulfill your bookings, orders, and provide services efficiently.",
                "With payment gateways to securely process transactions without exposing sensitive data.",
                "With legal authorities if required by law or to comply with legal obligations."
            ]
        },
        {
            icon: MdSecurity,
            title: "Data Security",
            points: [
                "We use encryption technologies to protect sensitive information during transmission and storage.",
                "Our systems are secured with advanced measures to prevent unauthorized access or data breaches.",
                "Access to personal data is limited to authorized personnel only for operational purposes.",
                "We regularly monitor and update our systems to maintain high security standards."
            ]
        },
        {
            icon: FaCookie,
            title: "Cookies and Tracking",
            points: [
                "We use cookies to remember your preferences, login sessions, and improve your browsing experience.",
                "Tracking tools help us understand user behavior and enhance platform performance.",
                "Some cookies are essential for functionality, while others help in analytics and improvements."
            ]
        },
        {
            icon: FaUserShield,
            title: "Your Rights",
            content: "You have control over your data:",
            points: [
                "You can access, update, or correct your personal information through your account settings anytime.",
                "You can request deletion of your account and associated data, subject to legal requirements.",
                "You may opt out of promotional emails and notifications at any time.",
                "You can contact us to understand how your data is being used or shared."
            ]
        },
        {
            icon: FaDatabase,
            title: "Data Retention",
            points: [
                "We retain your data only as long as necessary to provide services and fulfill legal obligations.",
                "Some information may be retained even after account deletion for compliance purposes.",
                "We periodically review and delete data that is no longer required."
            ]
        },
        {
            icon: FaEdit,
            title: "Changes to Privacy Policy",
            points: [
                "We may update this policy from time to time to reflect changes in our practices or legal requirements.",
                "Updated policies will be posted with a revised 'Last Updated' date for transparency.",
                "Continued use of the platform means you accept the updated privacy policy."
            ]
        }
    ];

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-16 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <MdPrivacyTip className="text-white text-xl" />
                            <span className="text-white text-sm font-medium">Updated: {currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                            Privacy Policy
                        </h1>
                        <div className="w-20 h-1 bg-white/50 mx-auto mb-6"></div>
                        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
                            At {siteTitle}, we value your privacy and are committed to protecting your personal information. 
                            This policy explains how we collect, use, and safeguard your data.
                        </p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                    <div className="space-y-6">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                                >
                                    <div className="border-l-4 border-orange-500">
                                        <div className="p-6 md:p-8">
                                            {/* Header with Icon */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                                                    <Icon className="text-orange-500 text-xl group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                                    {section.title}
                                                </h2>
                                            </div>

                                            {/* Content */}
                                            {section.content && (
                                                <p className="text-gray-600 font-medium mb-3">
                                                    {section.content}
                                                </p>
                                            )}

                                            {/* Points List */}
                                            <ul className="space-y-2 mt-3">
                                                {section.points.map((point, pointIdx) => (
                                                    <li key={pointIdx} className="flex items-start gap-3 text-gray-600">
                                                        <span className="text-orange-500 mt-1">•</span>
                                                        <span className="text-sm md:text-base leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Footer */}
                                            {section.footer && (
                                                <p className="text-orange-600 font-medium mt-3 pt-2 border-t border-gray-100">
                                                    {section.footer}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500 rounded-2xl mb-4 shadow-lg">
                            <FaLock className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Have Questions?</h3>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about this Privacy Policy, please contact us.
                        </p>
                        <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Contact Support
                        </button>
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

export default PrivacyPolicy