import React from 'react'
import Navbar from '../components/Navbar'

const TermsOfServices = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center mx-auto mt-20 mb-10 px-5 sm:ps-10 md:ps-20 lg:ps-40 xl:ps-44">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4 md:ps-56">
                    Terms of Service
                </h1>
                <p className=''>Welcome to Foodies. By accessing or using our platform, you agree to comply with and be bound by the following terms.</p>

                {/* Section */}
                <div className="space-y-3 mt-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                        1. Use of the Platform
                    </h2>
                    <h4 className='text-medium text-lg'>Foodies provides restaurants and users with tools to:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Book tables at partnered restaurants based on real-time availability and preferences</li>
                        <li className='mt-1'>Order food, beverages, and snacks directly from listed restaurant menus online</li>
                        <li className='mt-1'>Manage restaurant operations including orders, bookings, menus, and customer interactions efficiently</li>
                    </ul>
                    <h4 className='text-medium text-lg'>You agree to use the platform only for lawful purposes.</h4>
                    <h2 className='text-xl font-semibold text-gray-800'>2. User Accounts</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>You are responsible for ensuring that all registration details, including email and phone number, are correct and kept up to date.</li>
                        <li className='mt-1'>You must maintain the confidentiality of your account credentials and prevent unauthorized access to your account.</li>
                        <li className='mt-1'>Any activity performed through your account will be considered your responsibility, whether authorized or not.</li>
                        <li className='mt-1'>Foodies reserves the right to suspend or terminate accounts found providing false or misleading information.</li>
                    </ul>
                    <h2 className='text-xl font-semibold text-gray-800'>3. Restaurant Responsibilities</h2>
                    <h4 className='text-medium text-lg'>Restaurants using Foodies agree to:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Restaurants are required to provide accurate and updated information regarding menu items, pricing, availability, and special offers.</li>
                        <li className='mt-1'>All confirmed table bookings made through the platform must be honored without unnecessary delays or cancellations.</li>
                        <li className='mt-1'>Restaurants must maintain hygiene, food safety, and quality standards as per applicable regulations and industry practices.</li>
                    </ul>
                    <h2 className='text-xl font-semibold text-gray-800'>4. Payments</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>All transactions made on the platform are processed through secure and encrypted payment gateways to ensure safety.</li>
                        <li className='mt-1'>Users must ensure that payment details entered are correct to avoid transaction failures or delays.</li>
                        <li className='mt-1'>Foodies does not store sensitive financial information such as card numbers on its servers.</li>
                        <li className='mt-1'>In case of payment failures, users may need to contact their bank or payment provider for assistance.</li>
                    </ul>
                    <h2 className='text-xl font-semibold text-gray-800'>5. Cancellations & Refunds</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Users can cancel bookings or orders based on the cancellation policy defined by the respective restaurant.</li>
                        <li className='mt-1'>Refund eligibility depends on factors such as timing of cancellation, payment method, and restaurant policies.</li>
                        <li className='mt-1'>Refunds, if applicable, will be processed within a reasonable time frame through the original payment method.</li>
                    </ul>
                    <h2 className='text-xl font-semibold text-gray-800'>6. Prohibited Activities</h2>
                    <h4 className='text-medium text-lg'>You must not:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Attempting to hack, disrupt, or interfere with the platform’s functionality or security systems is strictly prohibited.</li>
                        <li className='mt-1'>Posting false, misleading, or fraudulent information that may harm users or restaurants is not allowed.</li>
                        <li className='mt-1'>Unauthorized access to other user accounts, data, or system resources is considered a serious violation.</li>
                        <li className='mt-1'>Using the platform for illegal activities, including fraud or unauthorized transactions, is strictly forbidden</li>
                    </ul>
                    <h2 className='text-xl font-semibold text-gray-800'>7. Limitation of Liability</h2>
                    <h4 className='text-medium text-lg'>Foodies is not responsible for:</h4>
                    <ul className='list-disc pl-5'>
                        <li className='mt-1'>Foodies does not guarantee the quality, taste, or safety of food provided by restaurants listed on the platform.</li>
                        <li className='mt-1'>We are not responsible for delays, cancellations, or service issues caused by restaurants or external factors.</li>
                        <li className='mt-1'>Any disputes regarding food quality or service must be resolved directly with the restaurant.</li>
                    </ul>

                </div>

            </div>
        </>
    )
}

export default TermsOfServices