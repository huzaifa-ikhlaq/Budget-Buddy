import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../context/context";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function MainPage() {
    const { income, setIncome, expense, setExpense, totalExpense, totalTax, setTotalTax } = useContext(context);

    const today = new Date().toISOString().split("T")[0]

    const [popupOpen, setPopupOpen] = useState(false);
    const [transferFrom, setTransferFrom] = useState('');
    const [transferTo, setTransferTo] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    // ----------Balance------  
    const [saving, setSaving] = useState(() => {
        const saved = localStorage.getItem('saving');
        return saved ? JSON.parse(saved) : 0;
    });
    const [cash, setCash] = useState(() => {
        const saved = localStorage.getItem('cash')
        return saved ? JSON.parse(saved) : 0
    });
    const [card, setCard] = useState(() => {
        const saved = localStorage.getItem('card')
        return saved ? JSON.parse(saved) : 0
    });
    const [expenseDateFrom, setExpenseDateFrom] = useState(today)
    const [expenseDateTo, setExpenseDateTo] = useState(today)

    // filterExpensebyDate
    const filteredExpense = expense.filter((item) => item.Date >= expenseDateFrom && item.Date <= expenseDateTo)

    const chartData1 = {
        labels: ["Cash", "Card", "Saving"], // still needed for tooltips
        datasets: [
            {
                data: [cash, card, saving],
                backgroundColor: ["#FF9B37", "#39D4D4", "#FFC849"],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // 🚫 hide the legend completely
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
    };
    // Chart 2: Expenses (categories vs amounts)
    const chartData2 = {
        labels: filteredExpense.map(
            (item) => `${item.Category} - ${item.Date} `
        ),
        datasets: [
            {
                label: "Expenses",
                data: filteredExpense.map((item) => Number(item.Amount)),
                backgroundColor: ["#FF5378", "#1EA5FF", "#39D4D4", "#FFC849"],
            },
        ],
    };

    const options2 = {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    // calculate from income
    useEffect(() => {
        const cashTotal = income
            .filter((item) => item.IncomeType === "Cash")
            .reduce((acc, curr) => acc + Number(curr.Amount), 0);

        const cardTotal = income
            .filter((item) => item.IncomeType === "Card")
            .reduce((acc, curr) => acc + Number(curr.Amount), 0);

        setCash(cashTotal);
        setCard(cardTotal);
    }, [income]);

    // save to localStorage whenever cash or card changes
    useEffect(() => {
        localStorage.setItem('cash', JSON.stringify(cash));
        localStorage.setItem('card', JSON.stringify(card));
        localStorage.setItem('saving', JSON.stringify(saving));
    }, [cash, card, saving]);


    // Transfer money
    const transferMoney = () => {
        if (!transferFrom || !transferTo || !transferAmount)
            return alert("Please fill all fields");

        if (transferFrom === transferTo) {
            return alert("You cannot transfer to the same account");
        }

        const amount = Number(transferAmount);
        let success = false;

        if (transferFrom === "Cash" && transferTo === "Card") {
            if (cash >= amount) {
                setCash(cash - amount);
                setCard(card + amount);
                success = true;
            } else {
                alert("Not enough cash balance");
            }
        }

        if (transferFrom === "Card" && transferTo === "Cash") {
            if (card >= amount) {
                setCard(card - amount);
                setCash(cash + amount);
                success = true;
            } else {
                alert("Not enough card balance");
            }
        }

        if (transferFrom === "Cash" && transferTo === "Saving") {
            if (cash >= amount) {
                setCash(cash - amount);
                setSaving(saving + amount);
                success = true;
            } else {
                alert("Not enough cash balance");
            }
        }

        if (transferFrom === "Card" && transferTo === "Saving") {
            if (card >= amount) {
                setCard(card - amount);
                setSaving(saving + amount);
                success = true;
            } else {
                alert("Not enough card balance");
            }
        }

        if (transferFrom === "Saving" && transferTo === "Cash") {
            if (saving >= amount) {
                setSaving(saving - amount);
                setCash(cash + amount);
                success = true;
            } else {
                alert("Not enough saving balance");
            }
        }

        if (transferFrom === "Saving" && transferTo === "Card") {
            if (saving >= amount) {
                setSaving(saving - amount);
                setCard(card + amount);
                success = true;
            } else {
                alert("Not enough saving balance");
            }
        }

        if (success) {
            setTransferAmount("");
            setTransferFrom("");
            setTransferTo("");
            setPopupOpen(false);
        }
    };

    // Tax deduction 
    const taxableIncome = income.filter(item => item.IncomeTaxType === "Taxable").reduce((acc, curr) => acc + Number(curr.Amount), 0);

    return (
        <div className="">
            <div className="flex flex-col gap-5">
                {/* upper area */}
                <div className="flex max-2xl:flex-col gap-5 w-full">
                    {/* left side */}
                    <div className="bg-white flex flex-col relative rounded-xl 2xl:w-[80%] p-4 md:p-8">
                        <h2 className="text-[24px] font-semibold mb-6">Your Financial Summary</h2>
                        <div className="flex justify-between w-full max-lg:flex-col">
                            {/* left-side */}
                            <div className="flex flex-col h-full gap-2 md:gap-5">
                                <h4 className="text-[#3f4765] text-xl flex items-center gap-1">
                                    Money in cash:{" "}
                                    <span className="text-[#3f4765] text-2xl font-bold">{cash} $</span>
                                </h4>
                                <h4 className="text-[#3f4765] text-xl flex items-center gap-1">
                                    Money in card:{" "}
                                    <span className="text-[#3f4765] text-2xl font-bold">{card} $</span>
                                </h4>
                                <h4 className="text-[#3f4765] text-xl flex items-center gap-1">
                                    Your total savings:{" "}
                                    <span className="text-[#3f4765] text-2xl font-bold">{saving} $</span>
                                </h4>
                            </div>

                            {/* right-side */}
                            <div className="max-lg:mb-10">
                                <div className="size-50">
                                    <Doughnut data={chartData1} options={options} />

                                </div>
                            </div>

                            {/* Transfer money button */}
                            <button
                                onClick={() => setPopupOpen(!popupOpen)}
                                className="bg-gradient-to-r from-green-500 to-yellow-400 hover:opacity-70 text-white font-medium lg:absolute bottom-5 md:bottom-8 flex items-center justify-center rounded-lg cursor-pointer h-10 max-w-[288px] w-[288px]"
                            >
                                Transfer money
                            </button>

                            {/* popup */}
                            {popupOpen && (
                                <div className="bg-black/60 fixed top-0 left-0 z-50 h-screen w-full">
                                    <div className="bg-gray-100 fixed top-1/2 left-1/2 -translate-1/2 p-10 rounded-xl ">
                                        <span onClick={() => setPopupOpen(!popupOpen)}>
                                            <svg
                                                className="size-10 absolute top-2 right-4 cursor-pointer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20px"
                                                height="20px"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeLinecap="round"
                                                    strokeWidth="2"
                                                    d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4"
                                                />
                                            </svg>
                                        </span>
                                        <h2 className="text-center text-3xl text-black font-semibold">
                                            Transfer money
                                        </h2>

                                        {/* main-content */}
                                        <div className="flex flex-col items-center gap-6 my-10">
                                            {/* from input */}
                                            <select
                                                value={transferFrom}
                                                onChange={(e) => setTransferFrom(e.target.value)}
                                                className="bg-white text-lg font-medium text-gray-600 focus:outline-green-600 rounded-lg cursor-pointer w-full h-11 px-1"
                                            >
                                                <option value="" disabled hidden>
                                                    From
                                                </option>
                                                <option value="Cash">Cash</option>
                                                <option value="Card">Card</option>
                                                <option value="Saving">Saving</option>
                                            </select>

                                            {/* to input */}
                                            <select
                                                value={transferTo}
                                                onChange={(e) => setTransferTo(e.target.value)}
                                                className="bg-white text-lg font-medium text-gray-600 focus:outline-green-600 rounded-lg cursor-pointer w-full h-11 px-1"
                                            >
                                                <option value="" disabled hidden>
                                                    To
                                                </option>
                                                <option value="Cash">Cash</option>
                                                <option value="Card">Card</option>
                                                <option value="Saving">Saving</option>
                                            </select>

                                            {/* Amount */}
                                            <input
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                                type="number"
                                                placeholder="Amount"
                                                className="bg-[#dbdbdb] text-lg font-medium text-gray-800 focus:outline-green-600 rounded-lg w-full h-11 px-2"
                                            />
                                        </div>

                                        {/* button */}
                                        <button
                                            onClick={transferMoney}
                                            className="bg-gradient-to-r from-green-500 to-yellow-400 hover:opacity-70 text-white font-medium flex items-center justify-center rounded-lg cursor-pointer h-10 w-full"
                                        >
                                            Confirm transfer
                                        </button>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                    {/* right side  */}
                    <div className='bg-white rounded-xl w-full p-4 md:p-8'>
                        {/* input dates */}
                        <div className='flex max-md:flex-col gap-3 md:gap-6'>
                            {/* from date  */}
                            <div className='flex flex-col'>
                                <span className='text-lg font-medium'>Form:</span>
                                <input value={expenseDateFrom} onChange={(e) => setExpenseDateFrom(e.target.value)} className='bg-white text-[#6e7499] font-medium border border-[#9ea2b8] cursor-pointer w-[198px] h-11 px-1 rounded-lg' type="date" name="" id="" />
                            </div>
                            {/* to date   */}
                            <div className='flex flex-col'>
                                <span className='text-lg font-medium'>To:</span>
                                <input value={expenseDateTo} onChange={(e) => setExpenseDateTo(e.target.value)} className='bg-white text-[#6e7499] font-medium border border-[#9ea2b8]   w-[198px] h-11 px-1 rounded-lg' type="date" name="" id="" />
                            </div>
                        </div>
                        <h2 className='text-xl font-medium my-5'>Your total expenses: <span className='text-2xl text-red-400 font-semibold '>{totalExpense}$</span></h2>
                        {/* Chart  */}
                        <div className='flex flex-col items-center gap-4'>
                            <div>
                                <div className='size-50'>
                                    <Doughnut data={chartData2} options={options2} />
                                </div>
                            </div>
                            {/* <NavLink></NavLink> */}
                            <NavLink to="/ExpensePage" className="text-[20px] text-[#808080] border border-[#808080] rounded-xl cursor-pointer transition-all duration-200 hover:opacity-50 px-3 py-1">Show full list</NavLink>
                        </div>
                    </div>
                </div>

                {/* bottom area  */}
                <div className='bg-white rounded-xl p-4 md:p-8'>
                    <div className='flex flex-col gap-3'>
                        {/* Total income before tax */}
                        <h1 className='text-[20px]'>
                            Your total income before tax:{" "}
                            <span className='text-2xl text-green-600 font-semibold'>
                                {taxableIncome.toFixed(2)} $
                            </span>
                        </h1>

                        {/* You need to pay + Calculate button */}
                        <div className='flex max-sm:flex-col sm:items-center gap-5'>
                            <h1 className='text-[20px]'>
                                You need to pay:{" "}
                                <span className='text-2xl text-red-600 font-semibold'>
                                    {totalTax.toFixed(2)} $
                                </span>
                            </h1>
                            <NavLink
                                to="/TaxPage"
                                className='text-[20px] text-[#808080] border border-[#808080] rounded-xl cursor-pointer transition-all duration-200 hover:opacity-50 px-3 py-1'
                            >
                                Calculate
                            </NavLink>
                        </div>

                        {/* Income after tax */}
                        <h1 className='text-[20px]'>
                            Your total income after tax:{" "}
                            <span className='text-2xl text-green-600 font-semibold'>
                                {(taxableIncome - totalTax).toFixed(2)} $
                            </span>
                        </h1>
                    </div>
                </div>

            </div>
        </div >
    )
}
