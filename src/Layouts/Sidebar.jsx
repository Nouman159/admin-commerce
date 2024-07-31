import React, { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Ellipsis, ShoppingCart, User } from 'lucide-react';

const Sidebar = forwardRef(({ }, ref) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div
            ref={ref}
            className="fixed w-56 h-full bg-black rounded-r-[1.4rem] shadow-sm max-md:w-[40%] overflow-auto no-scrollbar">
            <div className="flex flex-col mt-[2rem]">
                <div
                    onClick={() => {
                        if (location.pathname !== "/admin/dashboard") {
                            navigate("/admin/dashboard");
                        }
                    }}>
                    <div
                        className={`pl-7 py-3 mx-5 rounded text-center cursor-pointer mb-1 flex items-center transition-colors 
                        ${location.pathname === "/admin/dashboard"
                                ? "bg-white text-black"
                                : "bg-black text-white font-[600] hover:bg-white hover:text-black"
                            }`}>
                        <div className="mr-2">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold">Dashboard</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-[1rem]">
                <div
                    onClick={() => {
                        if (location.pathname !== "/admin/cart-items") {
                            navigate("/admin/cart-items");
                        }
                    }}>
                    <div
                        className={`pl-7 py-3 mx-5 rounded text-center cursor-pointer mb-1 flex items-center transition-colors 
                        ${location.pathname === "/admin/cart-items"
                                ? "bg-white text-black"
                                : "bg-black text-white font-[600] hover:bg-white hover:text-black"
                            }`}>
                        <div className="mr-2">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold">Pending Carts</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-[1rem]">
                <div
                    onClick={() => {
                        if (location.pathname !== "/admin/pending-orders") {
                            navigate("/admin/pending-orders");
                        }
                    }}>
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-1 flex items-center transition-colors 
                        ${location.pathname === "/admin/pending-orders"
                                ? "bg-white text-black"
                                : "bg-black text-white font-[600] hover:bg-white hover:text-black"
                            }`}>
                        <div className="mr-2">
                            <Ellipsis className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-bold">Pending Orders</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-[1rem]">
                <div
                    onClick={() => {
                        if (location.pathname !== "/admin/completed-orders") {
                            navigate("/admin/completed-orders");
                        }
                    }}>
                    <div
                        className={`pl-7 py-3 mx-5 rounded text-center cursor-pointer mb-1 flex items-center transition-colors 
                        ${location.pathname === "/admin/completed-orders"
                                ? "bg-white text-black"
                                : "bg-black text-white font-[600] hover:bg-white hover:text-black"
                            }`}>
                        <div className="mr-2">
                            <Check className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold">Complet. Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Sidebar;
