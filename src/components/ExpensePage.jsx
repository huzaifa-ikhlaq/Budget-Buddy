import { useState, useEffect, useContext } from 'react'
import { context } from '../context/context'

export default function ExpensePage() {

  const { expense, setExpense, totalExpense } = useContext(context);

  const today = new Date().toISOString().split("T")[0]

  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseCategory, setExpenseCategory] = useState("")
  const [expenseDate, setExpenseDate] = useState(today)
  const [expenseDescribtion, setExpenseDescribtion] = useState("")
  const [expenseType, setExpenseType] = useState("")
  const [expenseDateFrom, setExpenseDateFrom] = useState(today)
  const [expenseDateTo, setExpenseDateTo] = useState(today)

  const addExpense = () => {
    if (!expenseAmount || !expenseCategory || !expenseDate || !expenseType) return alert("Please fill all fields")

    setExpense([...expense, { Id: Date.now(), Amount: Number(expenseAmount), Category: expenseCategory, Date: expenseDate, Describtion: expenseDescribtion, Type: expenseType }])

    // reset fields
    setExpenseAmount("")
    setExpenseCategory("")
    setExpenseDate(today)
    setExpenseDescribtion("")
    setExpenseType("")
  }

  // deleteexpense
  const deleteexpense = (id) => {
    setExpense(expense.filter((item) => item.Id !== id));
  };

  // filterExpensebyDate
  const filteredExpense = expense.filter((item) => item.Date >= expenseDateFrom && item.Date <= expenseDateTo)


  return (
    <div>
      {/* upper-area */}
      <div className='flex max-[1300px]:flex-col gap-5'>
        {/* left side  */}
        <div className='bg-white rounded-xl min-[1300px]:w-[70%]  p-4 md:p-8'>
          <h1 className="text-[#3f4765] text-2xl md:text-[32px] font-bold ">Write down your expense</h1>

          <form onSubmit={(e) => e.preventDefault()} className='flex gap-5 max-[800px]:flex-col mt-7'>

            {/* left side  */}
            <div className='flex flex-col gap-5'>
              {/* input-Amount  */}
              <input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} type="number" className='bg-[#F5F5F5] text-lg font-semibold focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50' placeholder='Amount' />
              {/* select-type-Category */}
              <select value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] focus:outline-green-600 rounded-xl cursor-pointer indent-4 h-11.5 w-50' >
                <option value="" disabled hidden>Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Housing">Housing</option>
                <option value="Transport">Transport</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>

              {/* input-Date  */}
              <input value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} type="date" className='bg-white text-lg text-[#5a6078] cursor-pointer font-semibold border border-[#bcbec7] focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50' />
            </div>

            {/* right side  */}
            <div className='flex flex-col gap-5'>
              {/* input-describtion  */}
              <input value={expenseDescribtion} onChange={(e) => setExpenseDescribtion(e.target.value)} type="text" className='bg-[#F5F5F5] text-lg font-semibold focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50' placeholder='Describtion' />
              {/* select-type-Expense */}
              <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)} className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] focus:outline-green-600 cursor-pointer rounded-xl indent-4 h-11.5 w-50' >
                <option value="" disabled hidden>Type of expense</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
              {/* <button></button> */}
              <button onClick={() => addExpense()} className='bg-gradient-to-r from-green-500 to-yellow-400 hover:opacity-70 text-white font-medium  flex items-center justify-center rounded-lg cursor-pointer h-10 max-w-[300px] w-full  '>Add expense</button>
            </div>

          </form>

        </div>

        {/* right side */}
        <div className='bg-white rounded-xl w-full  p-4 md:p-8 '>
          <h1 className="text-[#3f4765] text-2xl md:text-[32px] font-bold ">Expenses:</h1>
          {/* input dates */}
          <div className='flex max-md:flex-col gap-3 w-full md:gap-6 mt-7'>
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
          {/* total-expense*/}
          <div className='bg-[#767C92] text-xl text-white font-semibold flex items-center justify-center rounded-xl   max-w-[250px] h-10 mt-5'>{totalExpense} $ Total expense</div>
          <div className='flex flex-wrap items-center gap-5 mt-5'>
            {filteredExpense.map((item) => (
              <div key={item.Id}>
                <div className='text-[17px] font-medium flex items-center gap-1 '>
                  <span className='text-green-600 text-lg font-medium '>{item.Amount} $</span> in <span>{item.Category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom area  */}
      <div className='bg-white rounded-xl w-full p-4 md:p-8 mt-5'>
        {filteredExpense.length > 0 ? (
          <div className='overflow-x-auto '>
            {/* --- TABLE FOR DESKTOP --- */}
            <div className="hidden xl:block w-full overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 text-[#3f4765]">Amount</th>
                    {filteredExpense.some((item) => item.Describtion.trim() !== "") && (
                      <th className="text-left p-3 text-[#3f4765]">Description</th>
                    )}
                    <th className="text-left p-3 text-[#3f4765]">Category</th>
                    <th className="text-left p-3 text-[#3f4765]">Date</th>
                    <th className="text-left p-3 text-[#3f4765]">Tax Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expense.map((item) => (
                    <tr key={item.Id} className="border-t">
                      <td className="p-3 text-lg font-medium text-green-600">{item.Amount} $</td>
                      {expense.some((item) => item.Describtion.trim() !== "") && (
                        <td className="p-3 text-lg font-medium text-[#3f4765]">
                          {item.Describtion || "-"}
                        </td>
                      )}
                      <td className="p-3 text-lg font-medium text-[#3f4765]">{item.Category}</td>
                      <td className="p-3 text-lg font-medium text-[#3f4765]">{item.Date}</td>
                      <td className="text-[#3f4765] text-lg font-medium flex items-center justify-between  p-3">
                        <span>{item.IncomeTaxType}</span>
                        <span
                          onClick={() => deleteIncome(item.Id)}
                          className="text-lg font-medium border border-[#f85842] text-[#f85842] hover:bg-[#f85842] hover:text-white transition-all duration-300 rounded-xl cursor-pointer py-1 px-4"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- CARD VIEW FOR MOBILE --- */}
            <div className="block xl:hidden space-y-4">
              {expense.map((item) => (
                <div
                  key={item.Id}
                  className="bg-white shadow-md rounded-xl p-4 border space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-green-600 font-bold">{item.Amount} $</span>
                    <button
                      onClick={() => deleteexpense(item.Id)}
                      className="text-sm border border-[#f85842] text-[#f85842] hover:bg-[#f85842] hover:text-white transition-all duration-300 rounded-lg px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                  {item.Describtion && (
                    <p className="text-[#3f4765] text-sm">
                      <span className="font-semibold">Description:</span> {item.Describtion}
                    </p>
                  )}
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Category:</span> {item.Category}
                  </p>
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Date:</span> {item.Date}
                  </p>
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Tax Type:</span> {item.Type}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <h1 className='text-[22px] text-[#3f4765] font-medium '>
            No expense added yet...
          </h1>
        )}

      </div>

    </div>
  )
}
