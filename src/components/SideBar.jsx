import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react"
import BudgetPlannerPage from "./BudgetPlannerPage";
import ExpensePage from "./ExpensePage";
import IncomePage from "./IncomePage";
import MainPage from "./MainPage";
import TaxPage from "./TaxPage";

export default function SideBar() {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    function Layout() {
        return (
            <div className="flex">
                <div className={`${isOpen && 'bg-black/50 fixed h-screen w-full z-50'}`}></div>
                {/* Sidebar */}
                <div
                    className={`w-64 min-h-screen bg-white fixed md:static z-50 transform transition-all duration-500 p-6 shadow-lg mt-0.5
                   ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >

                    {/* Title */}
                    <h2 className="text-[27px] font-bold text-[#3f4765] ml-4 mb-8">
                        Main menu
                    </h2>

                    {/* Menu Items */}
                    <ul className="space-y-4">
                        <li onClick={() => setIsOpen(false)} >
                            <NavLink
                                to="/MainPage"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                                    ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold"
                                        : "text-gray-500 hover:bg-gray-100"}`
                                }>
                                <span>🏠</span>
                                <span>Main Page</span>
                            </NavLink>
                        </li>

                        <li onClick={() => setIsOpen(false)} >
                            <NavLink
                                to="/IncomePage"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                                   ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold"
                                        : "text-gray-500 hover:bg-gray-100"}`
                                }>
                                <span>➕</span>
                                <span>Income Tracker</span>
                            </NavLink>
                        </li>

                        <li onClick={() => setIsOpen(false)} >
                            <NavLink
                                to="/ExpensePage"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                                     ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold"
                                        : "text-gray-500 hover:bg-gray-100"}`
                                }>
                                <span>📋</span>
                                <span>Expense Tracker</span>
                            </NavLink>
                        </li>

                        <li onClick={() => setIsOpen(false)} >
                            <NavLink
                                to="/TaxPage"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                                  ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold"
                                        : "text-gray-500 hover:bg-gray-100"}`
                                }>
                                <span>💡</span>
                                <span>Tax Calculator</span>
                            </NavLink>
                        </li>

                        <li onClick={() => setIsOpen(false)} >
                            <NavLink
                                to="/BudgetPlannerPage"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                                    ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold"
                                        : "text-gray-500 hover:bg-gray-100"}`
                                }>
                                <span>💼</span>
                                <span>Budget Planner</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div >
        );
    }

    return (
        <div>
            {/* Header */}
            <header>
                <div className="bg-white flex justify-center items-center gap-2 md:gap-4 h-23  w-full px-5">
                    <div onClick={() => setIsOpen(!isOpen)} className='flex flex-col gap-1  cursor-pointer md:hidden'>
                        <div className='bg-[#3f4765] h-[2.5px] md:h-[3px] w-6 md:w-5'></div>
                        <div className='bg-[#3f4765] h-[2.5px] md:h-[3px] w-6 md:w-5'></div>
                        <div className='bg-[#3f4765] h-[2.5px] md:h-[3px] w-6 md:w-5'></div>
                    </div>
                    <h1 className="text-[#3f4765] text-2xl md:text-[32px] font-bold text-center">Good morning, Dear Visitor!</h1>
                </div>
            </header>

            {/* Routes */}
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="MainPage" element={<MainPage />} />
                    <Route path="IncomePage" element={<IncomePage />} />
                    <Route path="ExpensePage" element={<ExpensePage />} />
                    <Route path="TaxPage" element={<TaxPage />} />
                    <Route path="BudgetPlannerPage/*" element={<BudgetPlannerPage />} />
                </Route>
            </Routes>
        </div>
    );
}
