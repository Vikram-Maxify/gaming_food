import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaShieldAlt, FaLock, FaUserSecret, FaChartLine, FaBug, FaCheckCircle } from 'react-icons/fa'
import { MdSecurity, MdPayment, MdVpnKey, MdReportProblem } from 'react-icons/md'
import { HiOutlineShieldCheck } from 'react-icons/hi'

const Security = () => {
    // 🔥 Get settings from Redux
    const { settings } = useSelector((state) => state.settings);
    const siteTitle = settings?.title || "Foodzzy";

    const securityFeatures = [
        {
            icon: FaShieldAlt,
            title: "End-to-End Encryption",
            description: "All your data is encrypted during transmission and storage"
        },
        {
            icon: FaLock,
            title: "Secure Payments",
            description: "PCI DSS compliant payment gateway integration"
        },
        {
            icon: FaUserSecret,
            title: "Privacy First",
            description: "We never share your data without your consent"
        },
        {
            icon: FaCheckCircle,
            title: "Regular Audits",
            description: "Continuous security monitoring and updates"
        }
    ];

    const sections = [
        //hekejh//
        {
            icon: MdSecurity,
            title: "Data Protection",
            points: [
                "We use advanced encryption technologies to protect sensitive data during transmission and storage.",
                "Our servers are secured with modern infrastructure to prevent unauthorized access and data breaches.",
                "We follow industry best practices to ensure your personal information remains safe and confidential.",
                "Data is stored in secure environments with strict access control and monitoring systems in place.",
                "We regularly update our systems to patch vulnerabilities and maintain strong protection standards."
            ]
        },
        {
            icon: MdPayment,
            title: "Payment Security",
            points: [
                "All payments are processed through secure and trusted third-party payment gateways.",
                "We do not store sensitive financial information such as card numbers or CVV details on our servers.",
                "Transactions are protected with encryption, tokenization, and fraud detection systems.",
                "Additional security layers such as OTP verification may be used for safe transaction processing.",
                "Payment partners follow strict compliance standards to ensure safe and reliable transactions."
            ]
        },
        {
            icon: MdVpnKey,
            title: "Account Security",
            points: [
                "Users are encouraged to keep their login credentials secure and avoid sharing them with others.",
                "We implement authentication systems to prevent unauthorized access to user accounts.",
                "Suspicious login attempts or unusual activity may trigger security checks or temporary restrictions.",
                "Users should use strong passwords combining letters, numbers, and special characters.",
                "Account recovery options are secured to prevent misuse and unauthorized access."
            ]
        },
        {
            icon: FaChartLine,
            title: "Monitoring and Prevention",
            points: [
                "We continuously monitor our systems to detect and prevent potential security threats or vulnerabilities.",
                "Automated tools help identify suspicious activities and prevent fraudulent behavior in real time.",
                "Regular security audits and penetration testing are conducted to strengthen platform defenses.",
                "We maintain logs and tracking systems to investigate and respond to security incidents quickly.",
                "Our team actively works to identify and resolve risks before they affect users."
            ]
        },
        {
            icon: MdReportProblem,
            title: "Reporting Security Issues",
            points: [
                "If you notice any suspicious activity or security vulnerability, please report it immediately.",
                "You can contact us at security@{siteTitle.toLowerCase()}.com for security-related concerns.",
                "We take all reports seriously and investigate them with high priority.",
                "Appropriate actions are taken quickly to fix issues and prevent future risks.",
                "We appreciate responsible disclosure from users and security researchers."
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
        
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
                
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-16 md:py-20 overflow-hidden mt-5">
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                    
                    {/* Lock Icon Animation */}
                    <div className="absolute top-1/4 right-10 animate-bounce-slow opacity-10">
                        <FaLock className="text-white text-8xl" />
                    </div>
                    
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <HiOutlineShieldCheck className="text-green-400 text-xl" />
                            <span className="text-white/90 text-sm font-medium">Updated: {currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                            Security Policy
                        </h1>
                        <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
                            At {siteTitle}, we prioritize the safety of your data and transactions by implementing 
                            strong security measures across our platform.
                        </p>
                    </div>
                </div>

                {/* Security Features Grid */}
                <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {securityFeatures.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-center group"
                                >
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500 transition-colors duration-300">
                                        <Icon className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h3>
                                    <p className="text-gray-500 text-xs">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="max-w-4xl mx-auto px-4 py-8 pb-16">
                    <div className="space-y-6">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                                >
                                    <div className="border-l-4 border-green-500">
                                        <div className="p-6 md:p-8">
                                            {/* Header with Icon */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                                                    <Icon className="text-green-600 text-xl group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                                    {section.title}
                                                </h2>
                                            </div>

                                            {/* Points List */}
                                            <ul className="space-y-3 mt-3">
                                                {section.points.map((point, pointIdx) => (
                                                    <li key={pointIdx} className="flex items-start gap-3 text-gray-600">
                                                        <div className="min-w-[20px] mt-1">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        </div>
                                                        <span className="text-sm md:text-base leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Security Badges Section */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                                alt="Visa Secure"
                                className="h-8 w-auto mx-auto mb-2 opacity-60"
                            />
                            <p className="text-xs text-gray-500">PCI DSS Compliant</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" 
                                alt="Mastercard Secure"
                                className="h-8 w-auto mx-auto mb-2 opacity-60"
                            />
                            <p className="text-xs text-gray-500">Secure Transaction</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PayPal_logo.svg/1200px-PayPal_logo.svg.png" 
                                alt="PayPal Verified"
                                className="h-8 w-auto mx-auto mb-2 opacity-60"
                            />
                            <p className="text-xs text-gray-500">Verified Gateway</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                            <FaShieldAlt className="text-green-500 text-3xl mx-auto mb-2" />
                            <p className="text-xs text-gray-500">256-bit SSL</p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl mb-4 shadow-lg">
                            <FaBug className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Report a Security Issue</h3>
                        <p className="text-gray-600 mb-4">
                            Found a vulnerability? We take security seriously. Please report it to us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="bg-green-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                                Report Now
                            </button>
                            <button className="border border-green-500 text-green-600 px-6 py-2.5 rounded-full font-semibold hover:bg-green-50 transition-all duration-300">
                                Security FAQ
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            Or email us at: <span className="text-green-600 font-mono">security@{siteTitle.toLowerCase().replace(/\s/g, '')}.com</span>
                        </p>
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
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}

export default Security