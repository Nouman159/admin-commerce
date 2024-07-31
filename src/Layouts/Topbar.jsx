import React, { Fragment, useState, useEffect } from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { Popover, Transition } from "@headlessui/react";
import { CiUser } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../axios';

const Topbar = ({ showNav, setShowNav }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [sessionUser, setSessionUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
            setSessionUser({ name: 'Admin', email: 'admin123@gmail.com' });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get('/admin/logout');
            if (response.status === 200) {
                localStorage.removeItem('adminId');
                setSessionUser(null);
                navigate('/login');
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem('adminId');
                navigate('/login')
            }
        }
    };

    return (
        <div className={`w-full h-16 flex bg-white justify-between items-center transition-all duration-[400ms] ${showNav ? 'pl-[10.5rem] max-sm:pl-[14rem]' : ""}`}>
            <div className='pl-4 md:pl-16'>
                <HiMenuAlt2 className='h-8 w-10 max-md:h-[20px] max-md:w-[20px] text-gray-700 cursor-pointer' onClick={() => setShowNav(!showNav)} />
            </div>
            <div className="text-[1.5rem] font-[600] font-bold">PRINTFUL PK ADMIN</div>
            <div className={`transition-all duration-[400ms] ${showNav ? '' : "pr-16 max-sm:pr-[14rem]"}`}>
                <Popover className="relative">
                    <Popover.Button onClick={() => setOpenMenu(!openMenu)} className="flex gap-2 outline-none mr-1 md:mr-4 cursor-pointer text-gray-700">
                        <CiUser className='h-10 w-10 border-2 rounded-full border-gray-600 p-2 mt-[6px]' />
                    </Popover.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform scale-95" enterTo="transform scale-100" leave="transition ease-in duration-75" leaveFrom="transform scale-100" leaveTo="transform scale-95">
                        <Popover.Panel className="mr-8 md:mr-10 absolute -right-16 max-sm:right-0 z-50 mt-4 bg-white shadow-sm rounded-md max-w-xs max-sm:w-[230px] w-[250px] py-3">
                            <div>
                                {sessionUser && (
                                    <center className="mt-5">
                                        <div className="text-[14px] font-[400]">{sessionUser.name}</div>
                                        <div className="text-[12px] font-[600]">{sessionUser.email}</div>
                                        <button onClick={handleLogout} className="mt-5 text-center w-[50%] rounded bg-black text-white font-[600] py-1 mb-5 shadow-md text-[0.8rem]">
                                            Logout
                                        </button>
                                    </center>
                                )}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </div>
    );
};

export default Topbar;
