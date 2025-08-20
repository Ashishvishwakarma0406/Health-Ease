import React, { useState } from 'react';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const MedicineOrderPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [addedToCartId, setAddedToCartId] = useState(null);
    const [quantities, setQuantities] = useState({});

    const navigate = useNavigate();  // Hook for navigation

    const medicines = [
        { id: 1, name: 'Paracetamol', price: 50, image: 'https://www.pharmacyonline.co.uk/uploads/images/products/verylarge/pharmacy-online-paracetamol-soluble-paracetamol-500mg-100-effervescent-soluble-tablets-1603455187paracetamol-soluble-500mg-effervescent.jpg' },
        { id: 2, name: 'Ibuprofen', price: 100, image: 'https://www.xalmeds.com/cdn/shop/files/IMG_6895_1445x.jpg?v=1698916247' },
        { id: 3, name: 'Amoxicillin', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQC-kfcWUyDaAbBgUKC666K2fRhr79vtPDQg&s' },
        { id: 4, name: 'Cetirizine', price: 30, image: 'https://smarthealer.pk/wp-content/uploads/2024/09/cetirizine-tablet.webp' },
        { id: 5, name: 'Aspirin', price: 75, image: 'https://carefromnature.co.uk/image/cache/catalog/BAYER/aspirin-protect-cardio-100-mg-40-tablets-bayer-1000x1000.webp' },
        { id: 6, name: 'Vitamin C', price: 120, image: 'https://images.apollo247.in/pub/media/catalog/product/V/I/VIT0039_1_1.jpg' },
        { id: 7, name: 'Cough Syrup', price: 150, image: 'https://th.bing.com/th/id/OIP._PKjGGOdjZsU40Qb4TUYRQHaHa?rs=1&pid=ImgDetMain' },
        { id: 8, name: 'Antihistamine', price: 90, image: 'https://www.4sgm.com/assets/Image/Product/detailsbig/57985.jpg' },
        { id: 9, name: 'Metformin', price: 110, image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/323/323128/metformin-tablet-box.jpg' },
        { id: 10, name: 'Losartan', price: 180, image: 'https://www.bbukltd.com/wp-content/uploads/2015/08/Losartan-50mg-Tabs-28s-3-Copy.jpg' },
        { id: 11, name: 'Levothyroxine', price: 130, image: 'https://5.imimg.com/data5/SELLER/Default/2022/2/BQ/DV/DU/146734484/levothyroxin-tablets-500x500.png' },
        { id: 12, name: 'Doxycycline', price: 160, image: 'https://medsrus.co.uk/image/cache/catalog/old_site/104/doxycycline-capsules-100mg-1-800x800.jpg' },
        { id: 13, name: 'Omeprazole', price: 140, image: 'https://www.xalmeds.com/cdn/shop/products/B2FD4AEA-ECE0-427D-B716-D29422D6EDBA.jpg?v=1682138946' },
        { id: 14, name: 'Sertraline', price: 170, image: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325632/a-packet-of-sertraline-lying-on-a-table-image-credit-https-commons-wikimedia-org-wiki-file-zoloft-50-mg-cn-jpg-2012.jpg?w=1155&h=1734' },
        { id: 15, name: 'Lisinopril', price: 200, image: 'https://api.evaro.com/wp-content/uploads/2021/10/Lisinopril-FRONT.png' },
        { id: 16, name: 'Hydrochlorothiazide', price: 90, image: 'https://5.imimg.com/data5/SELLER/Default/2022/11/JK/HS/NH/93488370/hydrochlorothiazide-tablets.jpg' },
        { id: 17, name: 'Fluoxetine', price: 220, image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/383168280/SI/FD/GI/6630452/fluoxetine-20-mg.jpg' },
        { id: 18, name: 'Ciprofloxacin', price: 80, image: 'https://www.indiadentalcare.in/wp-content/uploads/2023/12/Ciprofloxacin-Antibiotics-Drug-.jpg' },
        { id: 19, name: 'Amlodipine', price: 95, image: 'https://ecommerce.genericartmedicine.com/upload/products/product-photo-1602402024104042.jpg' },
        { id: 20, name: 'Zolpidem', price: 130, image: 'https://www.somacare.co.in/wp-content/uploads/2019/02/zodivas-5-Zolpidem-5mg.jpg' },
    ];

    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleQuantityChange = (id, value) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: value,
        }));
    };

    const addToCart = (medicine) => {
        const quantity = quantities[medicine.id] || 1;

        const existingMedicine = cart.find(item => item.id === medicine.id);

        if (existingMedicine) {
            setCart(cart.map(item =>
                item.id === medicine.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCart([...cart, { ...medicine, quantity }]);
        }

        setAddedToCartId(medicine.id);

        setTimeout(() => {
            setAddedToCartId(null);
        }, 2000);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateGST = () => {
        return calculateTotal() * 0.18;  // Assuming 18% GST
    };

    const calculateDiscount = () => {
        return calculateTotal() * 0.1;  // Assuming 10% discount
    };

    const handleCheckout = () => {
        const subtotal = calculateTotal();
        const gst = calculateGST();
        const discount = calculateDiscount();
        const total = subtotal + gst - discount;

        navigate('/address', {
            state: { cart, subtotal, gst, discount, total }  // Pass cart data and calculations
        });
    };

    return (
        <div className="pt-[12vh] bg-gray-100 min-h-screen">
            {/* Search Bar */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
                <div className="flex items-center w-full bg-gray-200 rounded-full px-4 py-2 pr-10">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        className="flex-grow bg-transparent outline-none"
                        placeholder="Search for medicines..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="ml-4 relative">
                    <button onClick={toggleCart} className="relative">
                        <FaCartPlus className="text-2xl text-gray-700" />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            {/* Special Offer */}
            <div className="flex justify-center p-4 bg-blue-500 text-white text-center">
                <p className="text-lg">Special Offer: Get up to 20% off on your first order!</p>
            </div>

            <div className="p-4"></div>
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
        <div className="flex w-[100%] transition-transform duration-500" style={{ transform: 'translateX(0%)' }}>
            <div className="w-full h-64 bg-gray-300 flex-shrink-0">
                <img src="https://onemg.gumlet.io/565496d5-3ab4-4249-ac39-7461c566f8b9_1709034632.jpg?w=853&h=200&format=auto" alt="Slide 1" className="w-full h-full object-contain" />
            </div>
            <div className="w-full h-64 bg-gray-400 flex-shrink-0">
                <img src="path/to/your/image2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 bg-gray-500 flex-shrink-0">
                <img src="path/to/your/image3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 bg-gray-600 flex-shrink-0">
                <img src="path/to/your/image4.jpg" alt="Slide 4" className="w-full h-full object-cover" />
            </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button className="w-2 h-2 bg-white rounded-full"></button>
            <button className="w-2 h-2 bg-white rounded-full"></button>
            <button className="w-2 h-2 bg-white rounded-full"></button>
            <button className="w-2 h-2 bg-white rounded-full"></button>
        </div>
    </div>

            {/* Medicine List */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedicines.map((medicine) => (
                    <div key={medicine.id} className="bg-white p-4 rounded shadow-md">
                        <div className="h-40 bg-gray-200 rounded mb-4">
                            <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
                        <p className="text-gray-700 mb-4">Price: ₹{medicine.price}</p>
                        <div className="flex items-center mb-4">
                            <input
                                type="number"
                                min="1"
                                value={quantities[medicine.id] || 1}
                                onChange={(e) => handleQuantityChange(medicine.id, parseInt(e.target.value))}
                                className="w-16 p-2 border rounded mr-2"
                            />
                            <button
                                className={`w-full py-2 rounded transition-all duration-300 ${addedToCartId === medicine.id ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                                onClick={() => addToCart(medicine)}
                            >
                                {addedToCartId === medicine.id ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Modal */}
            {showCart && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80 relative">
                        <button onClick={() => setShowCart(false)} className='absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800'>
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            <div>
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-2" />
                                            <span className="text-sm">{item.name} x {item.quantity}</span>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <div className="mt-4 font-semibold text-lg">Total: ₹{calculateTotal()}</div>
                                <button
                                    onClick={handleCheckout}  // Navigate to the Address Page
                                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded"
                                >
                                    CheckOut
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicineOrderPage;
