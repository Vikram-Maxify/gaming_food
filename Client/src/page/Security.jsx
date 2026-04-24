import React from 'react'
import Navbar from '../components/Navbar'

const Security = () => {
    return (
        <>
            <Navbar />
            <div className="mx-auto mt-20 mb-10 px-5 sm:ps-10 md:ps-20 lg:ps-40 xl:ps-44">

                <h1 className="text-4xl font-bold text-gray-900 mb-4 md:ps-56">
                    Security Policy
                </h1>
                <p>
                    At Foodies, we prioritize the safety of your data and transactions by implementing strong security measures across our platform.
                </p>

                <div className="space-y-3 mt-3">

                    <h2 className="text-xl font-semibold text-gray-800">
                        1. Data Protection
                    </h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We use advanced encryption technologies to protect sensitive data during transmission and storage.</li>
                        <li className='mt-1'>Our servers are secured with modern infrastructure to prevent unauthorized access and data breaches.</li>
                        <li className='mt-1'>We follow industry best practices to ensure your personal information remains safe and confidential.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>2. Payment Security</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>All payments are processed through secure and trusted third-party payment gateways.</li>
                        <li className='mt-1'>We do not store sensitive financial information such as card numbers or CVV details on our servers.</li>
                        <li className='mt-1'>Transactions are protected with encryption and fraud detection mechanisms.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>3. Account Security</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Users are encouraged to keep their login credentials secure and avoid sharing them with others.</li>
                        <li className='mt-1'>We implement authentication systems to prevent unauthorized access to user accounts.</li>
                        <li className='mt-1'>Suspicious login attempts or unusual activity may trigger security checks or temporary restrictions.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>4. Monitoring and Prevention</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We continuously monitor our systems to detect and prevent potential security threats or vulnerabilities.</li>
                        <li className='mt-1'>Regular security audits and updates are performed to maintain a high level of protection.</li>
                        <li className='mt-1'>Our team actively works to identify and resolve risks before they affect users.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>5. Reporting Security Issues</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>If you notice any suspicious activity or security vulnerability, please report it immediately.</li>
                        <li className='mt-1'>You can contact us at <strong>security@foodies.com</strong> for security-related concerns.</li>
                        <li className='mt-1'>We take all reports seriously and work quickly to resolve any identified issues.</li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default Security