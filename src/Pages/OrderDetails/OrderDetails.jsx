import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
// import Navbar from '../../Components/Navbar/Navbar';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/get-order-details/${orderId}`);
                setOrder(response.data);
            } catch (err) {
                setError('Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>No order found.</div>;
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <div className="mb-4">
                        <p className="font-semibold text-lg">Order ID: {order._id}</p>
                        <p className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Customer Details:</p>
                        <p className="text-gray-600">Name: {order.deliveryInfo.fullName}</p>
                        <p className="text-gray-600">Phone No: {order.deliveryInfo.phoneNumber}</p>
                        <p className="text-gray-600">Address: {order.deliveryInfo.address}</p>
                        <p className="text-gray-600">City: {order.deliveryInfo.city}</p>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Cart Items:</p>
                        <ul className="space-y-2">
                            {order.cart.items.map((item, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <img
                                        src={item.finalImage}
                                        alt="Cart item"
                                        className="w-72 h-72 object-cover mr-4 rounded-lg shadow-sm"
                                    />
                                    <div>
                                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                                        <p className="text-gray-700">Price: Rs {item.price.toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total: Rs {order.totalAmount.toFixed(2)}</span>
                        <span className="text-gray-600">Payment Method: {order.paymentMethod}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
