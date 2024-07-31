import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

const AdminCart = () => {
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllCartItems = async () => {
            try {
                const response = await axiosInstance.get('/admin/get-cart-items');
                const allItems = response.data.cart.flatMap(cart => cart.items.map(item => ({
                    ...item,
                    user: cart.userId
                })));
                setCartItems(allItems);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('adminId');
                    navigate('/login')
                }
                setError('Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllCartItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500">No cart items found.</div>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-center">
                        {cartItems.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-2/3 lg:w-1/3 p-2">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                                    <img
                                        src={item.finalImage}
                                        alt="Cart item"
                                        className="w-full h-72 object-cover mb-2 rounded"
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-lg">
                                                Rs {item.price ? item.price.toFixed(2) : '0.00'}
                                            </span>
                                            <span className="text-gray-600">x{item.quantity || 0}</span>
                                        </div>
                                        {item.user && (
                                            <div className="mt-2">
                                                <p className="font-semibold">{item.user.username}</p>
                                                <p className="text-gray-600">{item.user.email}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminCart;
