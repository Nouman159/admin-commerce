import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

const CompletedOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await axiosInstance.get('/admin/get-completed-orders');
                setOrders(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('adminId');
                    navigate('/login');
                }
                setError('Failed to fetch pending orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedOrders();
    }, [navigate]);

    const handleOrderClick = (orderId) => {
        navigate(`/admin/order-details/${orderId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {orders.length === 0 ? (
                <div className="text-center text-gray-500">No completed orders found.</div>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order, index) => (
                        <li
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer"
                            onClick={() => handleOrderClick(order._id)}
                        >
                            <div className="mb-2">
                                <p className="font-semibold text-lg">Order ID: {order._id}</p>
                                <p className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-semibold">Customer:</p>
                                <p className="text-gray-600">Name: {order.deliveryInfo.fullName}</p>
                                <p className="text-gray-600">Phone No: {order.deliveryInfo.phoneNumber}</p>
                                <p className="text-gray-600">Address: {order.deliveryInfo.address}</p>
                                <p className="text-gray-600">City: {order.deliveryInfo.city}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Total: Rs {order.totalAmount.toFixed(2)}</span>
                                <span className="text-gray-600">Payment Method: {order.paymentMethod}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompletedOrders;
