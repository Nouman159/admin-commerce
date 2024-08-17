import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

const PendingOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [orderToComplete, setOrderToComplete] = useState(null); // Order ID to be marked complete

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axiosInstance.get('/admin/get-pending-orders');
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

        fetchPendingOrders();
    }, [navigate]);

    const handleOrderClick = (orderId) => {
        navigate(`/admin/order-details/${orderId}`);
    };

    const handleMarkAsComplete = async () => {
        try {
            const response = await axiosInstance.post(`/admin/mark-order-complete/${orderToComplete}`);
            if (response.status === 200) {
                alert('Order marked as complete.');
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderToComplete));
            }
        } catch (err) {
            alert('Failed to mark the order as complete.');
        } finally {
            setShowModal(false); // Close the modal
        }
    };

    const openModal = (orderId) => {
        setOrderToComplete(orderId); // Store order ID
        setShowModal(true); // Show modal
    };

    const closeModal = () => {
        setShowModal(false); // Close modal
        setOrderToComplete(null); // Reset order ID
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {orders.length === 0 ? (
                <div className="text-center text-gray-500">No pending orders found.</div>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order, index) => (
                        <li
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer"
                        >
                            <div className='cursor-pointer' onClick={() => handleOrderClick(order._id)}>

                                <div className="mb-2" >
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
                            </div>
                            <button
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => openModal(order._id)}
                            >
                                Mark as Complete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
                        <p>Are you sure you want to mark this order as complete?</p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleMarkAsComplete}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingOrders;


// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../axios';
// import { useNavigate } from 'react-router-dom';

// const PendingOrders = () => {
//     const navigate = useNavigate();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPendingOrders = async () => {
//             try {
//                 const response = await axiosInstance.get('/admin/get-pending-orders');
//                 setOrders(response.data);
//             } catch (err) {
//                 if (err.response && err.response.status === 401) {
//                     localStorage.removeItem('adminId');
//                     navigate('/login');
//                 }
//                 setError('Failed to fetch pending orders.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPendingOrders();
//     }, [navigate]);

//     const handleOrderClick = (orderId) => {
//         navigate(`/admin/order-details/${orderId}`);
//     };

//     const handleMarkAsComplete = async (orderId) => {
//         try {
//             const response = await axiosInstance.post(`/admin/mark-order-complete/${orderId}`);
//             if (response.status === 200) {
//                 alert('Order marked as complete.');
//                 setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
//             }
//         } catch (err) {
//             alert('Failed to mark the order as complete.');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {orders.length === 0 ? (
//                 <div className="text-center text-gray-500">No pending orders found.</div>
//             ) : (
//                 <ul className="space-y-4">
//                     {orders.map((order, index) => (
//                         <li
//                             key={index}
//                             className="bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer"
//                         >
//                             <div className="mb-2" onClick={() => handleOrderClick(order._id)}>
//                                 <p className="font-semibold text-lg">Order ID: {order._id}</p>
//                                 <p className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
//                             </div>
//                             <div className="mb-2">
//                                 <p className="font-semibold">Customer:</p>
//                                 <p className="text-gray-600">Name: {order.deliveryInfo.fullName}</p>
//                                 <p className="text-gray-600">Phone No: {order.deliveryInfo.phoneNumber}</p>
//                                 <p className="text-gray-600">Address: {order.deliveryInfo.address}</p>
//                                 <p className="text-gray-600">City: {order.deliveryInfo.city}</p>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <span className="font-semibold text-lg">Total: Rs {order.totalAmount.toFixed(2)}</span>
//                                 <span className="text-gray-600">Payment Method: {order.paymentMethod}</span>
//                             </div>
//                             <button
//                                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                 onClick={() => handleMarkAsComplete(order._id)}
//                             >
//                                 Mark as Complete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default PendingOrders;
