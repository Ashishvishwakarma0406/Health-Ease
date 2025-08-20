import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AddressPage = () => {
    const { state } = useLocation();  // Get cart and pricing data from the MedicineOrderPage

    if (!state) {
        return <p>No cart data found</p>;
    }

    const { cart, subtotal, gst, discount, total } = state;

    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobile, setMobile] = useState('');

    const handleAddressChange = (e) => setAddress(e.target.value);
    const handlePincodeChange = (e) => setPincode(e.target.value);
    const handleMobileChange = (e) => setMobile(e.target.value);

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex mt-12"> {/* Added mt-12 to move content lower */}
            {/* Left Half (Address Details) */}
            <div className="w-full md:w-1/2 pr-4">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">Address Information</h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter your address"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="pincode" className="block text-lg font-medium text-gray-700">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                value={pincode}
                                onChange={handlePincodeChange}
                                placeholder="Enter your pincode"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                id="mobile"
                                value={mobile}
                                onChange={handleMobileChange}
                                placeholder="Enter your mobile number"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Half (Cart Items & Pricing) */}
            <div className="w-full md:w-1/2 pl-4">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Cart Items</h3>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-3">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-2 flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{gst}</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <span>Discount (10%):</span>
                        <span>-₹{discount}</span>
                    </div>
                    <div className="font-semibold flex justify-between">
                        <span>Total:</span>
                        <span>₹{total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
