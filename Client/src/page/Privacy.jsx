import React from 'react'
import Navbar from '../components/Navbar'

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="mx-auto mt-20 mb-10 px-5 sm:ps-10 md:ps-20 lg:ps-40 xl:ps-44">

                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4 md:ps-56">
                    Privacy Policy
                </h1>
                <p>
                    At Foodies, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
                </p>

                {/* Section */}
                <div className="space-y-3 mt-3">

                    <h2 className="text-xl font-semibold text-gray-800">
                        1. Information We Collect
                    </h2>
                    <h4 className='text-medium text-lg'>We may collect the following types of information:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Personal information such as your name, email address, and phone number during registration and usage of the platform.</li>
                        <li className='mt-1'>Location data to help you find nearby restaurants, offers, and services based on your current or selected area.</li>
                        <li className='mt-1'>Payment-related information required for processing transactions securely through trusted payment providers.</li>
                    </ul>

                    <h4 className='text-medium text-lg'>This information helps us provide and improve our services.</h4>

                    <h2 className='text-xl font-semibold text-gray-800'>2. How We Use Your Information</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We use your data to process food orders, table bookings, and transactions smoothly without delays.</li>
                        <li className='mt-1'>Your information helps us personalize your experience by showing relevant restaurants and offers.</li>
                        <li className='mt-1'>We may send important updates such as booking confirmations, order status, and notifications.</li>
                        <li className='mt-1'>We analyze user behavior to improve platform performance, features, and overall experience.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>3. Data Sharing and Disclosure</h2>
                    <h4 className='text-medium text-lg'>We only share your information when necessary:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>With restaurants to fulfill your bookings, orders, and provide services efficiently.</li>
                        <li className='mt-1'>With payment gateways to securely process transactions without exposing sensitive data.</li>
                        <li className='mt-1'>With legal authorities if required by law or to comply with legal obligations.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>4. Data Security</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We use encryption technologies to protect sensitive information during transmission and storage.</li>
                        <li className='mt-1'>Our systems are secured with advanced measures to prevent unauthorized access or data breaches.</li>
                        <li className='mt-1'>Access to personal data is limited to authorized personnel only for operational purposes.</li>
                        <li className='mt-1'>We regularly monitor and update our systems to maintain high security standards.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>5. Cookies and Tracking</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We use cookies to remember your preferences, login sessions, and improve your browsing experience.</li>
                        <li className='mt-1'>Tracking tools help us understand user behavior and enhance platform performance.</li>
                        <li className='mt-1'>Some cookies are essential for functionality, while others help in analytics and improvements.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>6. Your Rights</h2>
                    <h4 className='text-medium text-lg'>You have control over your data:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>You can access, update, or correct your personal information through your account settings anytime.</li>
                        <li className='mt-1'>You can request deletion of your account and associated data, subject to legal requirements.</li>
                        <li className='mt-1'>You may opt out of promotional emails and notifications at any time.</li>
                        <li className='mt-1'>You can contact us to understand how your data is being used or shared.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>7. Data Retention</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We retain your data only as long as necessary to provide services and fulfill legal obligations.</li>
                        <li className='mt-1'>Some information may be retained even after account deletion for compliance purposes.</li>
                        <li className='mt-1'>We periodically review and delete data that is no longer required.</li>
                    </ul>

                    <h2 className='text-xl font-semibold text-gray-800'>8. Changes to Privacy Policy</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>We may update this policy from time to time to reflect changes in our practices or legal requirements.</li>
                        <li className='mt-1'>Updated policies will be posted with a revised "Last Updated" date for transparency.</li>
                        <li className='mt-1'>Continued use of the platform means you accept the updated privacy policy.</li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default PrivacyPolicy