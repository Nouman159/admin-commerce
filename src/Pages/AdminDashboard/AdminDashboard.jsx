import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        addedToCartCount: 0,
        paymentDoneCount: 0,
        completedCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get('/admin/get-orders-count');
                setStats(response.data);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('adminId');
                    navigate('/login')
                }
                setError('Failed to fetch stats.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto p-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Items Added to Cart</h2>
                        <p className="text-3xl font-bold">{stats.addedToCartCount}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Placed Orders</h2>
                        <p className="text-3xl font-bold">{stats.paymentDoneCount}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Completed Orders</h2>
                        <p className="text-3xl font-bold">{stats.completedCount}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
