import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import { context } from "../context/context";

export default function BudgetPlannerPage() {
  const { totalIncome } = useContext(context);

  // State for categories
  const [needsValues, setNeedsValues] = useState({});
  const [wantsValues, setWantsValues] = useState({});
  const [savingsValues, setSavingsValues] = useState({});

  const [needsTotal, setNeedsTotal] = useState(0);
  const [wantsTotal, setWantsTotal] = useState(0);
  const [savingsTotal, setSavingsTotal] = useState(0);

  // Utility: calculate sum of all inputs
  const calculateTotal = (values) =>
    Object.values(values).reduce((acc, val) => acc + Number(val || 0), 0);

  // ===== NAVBAR =====
  function NavBar() {
    const tabs = [
      { name: "Needs", path: "Needs" },
      { name: "Wants", path: "Wants" },
      { name: "Savings and debt repayment", path: "Savings" },
      { name: "Total", path: "Total" },
    ];

    return (
      <div>
        {/* Tabs */}
        <div className="bg-white rounded-2xl p-4 md:p-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg text-[16px] font-medium cursor-pointer ${isActive
                  ? "bg-gradient-to-r from-green-500 to-yellow-300 text-white shadow"
                  : "bg-gray-100 text-gray-600"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>

        {/* Active page */}
        <Outlet />
      </div>
    );
  }

  // ===== NEEDS =====
  function Needs() {
    const needs = [
      "Rent/Mortgage",
      "Gasoline",
      "Car Payment",
      "Electricity and Gas",
      "Water Bill",
      "Health Insurance",
      "Groceries",
      "Student Loan",
      "Phone and Internet",
    ];

    const handleChange = (item, value) => {
      setNeedsValues((prev) => ({ ...prev, [item]: value }));
    };

    const handleSave = () => {
      setNeedsTotal(calculateTotal(needsValues));
    };

    return (
      <div className="w-full mt-6">
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {needs.map((item) => (
              <input
                type="number"
                key={item}
                placeholder={item}
                value={needsValues[item] || ""}
                onChange={(e) => handleChange(item, e.target.value)}
                className="bg-gray-100 text-gray-600 text-[16px] px-5 py-3 rounded-lg font-medium"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-yellow-300 hover:from-green-600 transition-all duration-300 text-white px-6 py-3 cursor-pointer rounded-xl font-medium shadow"
            >
              Save Needs
            </button>
            <h1 className="text-[16px] font-medium text-gray-700">
              Total spent on necessities:
              <span className="text-green-600 text-xl font-semibold ml-1">
                {needsTotal} $
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // ===== WANTS =====
  function Wants() {
    const wants = [
      "Entertainment",
      "Dining Out",
      "Shopping",
      "Travel",
      "Gym Membership",
    ];

    const handleChange = (item, value) => {
      setWantsValues((prev) => ({ ...prev, [item]: value }));
    };

    const handleSave = () => {
      setWantsTotal(calculateTotal(wantsValues));
    };

    return (
      <div className="w-full mt-6">
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wants.map((item) => (
              <input
                type="number"
                key={item}
                placeholder={item}
                value={wantsValues[item] || ""}
                onChange={(e) => handleChange(item, e.target.value)}
                className="bg-gray-100 text-gray-600 text-[16px] px-5 py-3 rounded-lg font-medium"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-yellow-300 hover:from-green-600 transition-all duration-300 text-white px-6 py-3 cursor-pointer rounded-xl font-medium shadow"
            >
              Save Wants
            </button>
            <h1 className="text-[16px] font-medium text-gray-700">
              Total spent on wants:
              <span className="text-green-600 text-xl font-semibold ml-1">
                {wantsTotal} $
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // ===== SAVINGS =====
  function Savings() {
    const savings = [
      "Emergency Savings",
      "Retirement Savings",
      "Vacation Savings",
      "Education Savings",
      "House Savings",
    ];

    const handleChange = (item, value) => {
      setSavingsValues((prev) => ({ ...prev, [item]: value }));
    };

    const handleSave = () => {
      setSavingsTotal(calculateTotal(savingsValues));
    };

    return (
      <div className="w-full mt-6">
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savings.map((item) => (
              <input
                type="number"
                key={item}
                placeholder={item}
                value={savingsValues[item] || ""}
                onChange={(e) => handleChange(item, e.target.value)}
                className="bg-gray-100 text-gray-600 text-[16px] px-5 py-3 rounded-lg font-medium"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-yellow-300 hover:from-green-600 transition-all duration-300 text-white px-6 py-3 cursor-pointer rounded-xl font-medium shadow"
            >
              Save Savings
            </button>
            <h1 className="text-[16px] font-medium text-gray-700">
              Total savings:
              <span className="text-green-600 text-xl font-semibold ml-1">
                {savingsTotal} $
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // ===== TOTAL =====
  function Total() {
    return (
      <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl p-4 md:p-8 shadow-md gap-8 mt-5">
        {/* Left Section */}
        <div className="flex flex-col gpa-2 md:gap-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[#3f4765] mb-4">
            Your totals:
          </h2>
          <p className="text-lg md:text-2xl md:font-medium text-gray-700">
            Needs: <span className="text-green-600 font-semibold">{needsTotal} $</span>
          </p>
          <p className="text-lg md:text-2xl md:font-medium">
            Wants: <span className="text-green-600 font-semibold">{wantsTotal} $</span>
          </p>
          <p className="text-lg md:text-2xl md:font-medium">
            Savings and debt repayment:{" "}
            <span className="text-green-600 font-semibold">{savingsTotal} $</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gpa-2 md:gap-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[#3f4765] mb-4">
            50/30/20 comparison:
          </h2>
          <p className="text-lg md:text-2xl md:font-medium">
            Your total income after tax:{" "}
            <span className="text-green-600 font-semibold">{totalIncome} $</span>
          </p>
          <p className="text-lg md:text-2xl md:font-medium">
            50% for necessities:{" "}
            <span className="text-green-600 font-semibold">{(totalIncome * 0.5).toFixed(2)} $</span>
          </p>
          <p className="text-lg md:text-2xl md:font-medium">
            30% for wants:{" "}
            <span className="text-green-600 font-semibold">{(totalIncome * 0.3).toFixed(2)} $</span>
          </p>
          <p className="text-lg md:text-2xl md:font-medium">
            20% for savings and debt repayment:{" "}
            <span className="text-green-600 font-semibold">{(totalIncome * 0.2).toFixed(2)} $</span>
          </p>
        </div>
      </div>
    );
  }

  //  ====ROUTES====
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Needs />} />
        <Route path="Needs" element={<Needs />} />
        <Route path="Wants" element={<Wants />} />
        <Route path="Savings" element={<Savings />} />
        <Route path="Total" element={<Total />} />
      </Route>
    </Routes>
  );
}
