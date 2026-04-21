import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const AddToCart = () => {

    const [quantity, setQuantity] = useState(1)
    const [isRemoved, setIsRemoved] = useState(false)

    const price = 999

    const increaseQty = () => {
        setQuantity(prev => prev + 1)
    }

    const decreaseQty = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    }

    return (
        <>
            <Navbar />

            <div className='mt-10'>
                <div className="min-h-screen bg-gray-100 p-4 md:p-8">

                    {/* Container */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
                            <h2 className="text-xl font-semibold mb-8">Shopping Cart</h2>

                            {/* Item */}
                            {!isRemoved && (
                                <div className="flex flex-row flex-nowrap items-center gap-2 pb-4">

                                    {/* Image */}
                                    <img
                                        src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60"
                                        alt="Items"
                                        className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-xl"
                                    />

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0 ms-3">
                                        <h3 className="text-sm md:text-lg font-medium truncate">
                                            Items Names
                                        </h3>
                                        <p className="text-gray-500 text-xs truncate">Category</p>
                                        <p className="text-green-600 text-sm font-semibold mt-1">
                                            ₹{price * quantity}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center border-2 border-gray-400 rounded-lg overflow-hidden bg-white">

                                        <button
                                            className="px-2 py-1 text-gray-600 hover:bg-gray-200 active:scale-95 transition"
                                            onClick={decreaseQty}
                                        >
                                            −
                                        </button>

                                        <span className="px-2 text-sm font-medium text-gray-800">
                                            {quantity}
                                        </span>

                                        <button
                                            className="px-2 py-1 text-gray-600 hover:bg-gray-200 active:scale-95 transition"
                                            onClick={increaseQty}
                                        >
                                            +
                                        </button>

                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => setIsRemoved(true)}
                                        className="text-white bg-red-500 px-2 py-[7px] text-xs md:text-sm rounded-md hover:bg-red-600"
                                    >
                                        Remove
                                    </button>

                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="bg-white p-4 rounded-2xl shadow h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{isRemoved ? 0 : price * quantity}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>₹{isRemoved ? 0 : 50}</span>
                            </div>

                            <div className="flex justify-between font-semibold text-lg border-t pt-3">
                                <span>Total</span>
                                <span>₹{isRemoved ? 0 : (price * quantity + 50)}</span>
                            </div>

                            <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800">
                                Checkout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddToCart