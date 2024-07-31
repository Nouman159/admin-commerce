import React, { Fragment, useState } from 'react';
import Topbar from "./Topbar";
import { Transition } from "@headlessui/react";
import Sidebar from "./Sidebar";

const PortalLayout = ({ children }) => {
    const [showNav, setShowNav] = useState(true);
    return (
        <div>
            <div>
                <Topbar showNav={showNav} setShowNav={setShowNav} />
                <Transition
                    as={Fragment}
                    show={showNav}
                    enter="transform transition duration-[400ms]"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform duration-[400ms] transition ease-in-out"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Sidebar />
                </Transition>
                <main
                    className={`bg-gray-100 pt-6 transition-all duration-[400ms] ${showNav ? "pl-56" : ""
                        }`}>
                    <div className="bg-gray-100 px-4 md:px-16 min-h-screen max-h-[100%] pb-[4rem] ">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default PortalLayout