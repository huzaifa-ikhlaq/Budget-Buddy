import { useState, useContext } from 'react'
import { context } from '../context/context';

export default function IncomePage() {

  const { income, setIncome, totalIncome } = useContext(context);

  const today = new Date().toISOString().split("T")[0]

  const [amount, setAmount] = useState("")
  const [incomeType, setIncomeType] = useState("")
  const [incomeDate, setIncomeDate] = useState(today)
  const [incomeTaxType, setIncomeTaxType] = useState("")


  const addIncome = () => {
    if (!amount || !incomeDate || !incomeType || !incomeTaxType) return alert("Please fill all fields")

    setIncome([...income, { Id: Date.now(), Amount: Number(amount), IncomeType: incomeType, IncomeDate: incomeDate, IncomeTaxType: incomeTaxType }])

    // reset fields
    setAmount("")
    setIncomeType("")
    setIncomeDate(today)
    setIncomeTaxType("")
  }

  // deleteIncome
  const deleteIncome = (id) => {
    setIncome(income.filter((item) => item.Id !== id))
  }
  // Delete all
  const deleteAll = () => {
    setIncome([])
  }

  return (
    <div>
      {/* upper-area */}
      <div className='bg-white rounded-xl w-full p-4 md:p-8'>
        <h1 className='text-[32px] text-[#3f4765] font-semibold mb-5 leading-10'>
          Write down your income
        </h1>

        {/* form */}
        <form onSubmit={(e) => e.preventDefault()} >
          <div className='flex max-[1430px]:flex-col gap-6'>
            {/* input-Amount */}
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              className='bg-[#F5F5F5] text-lg font-semibold focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50'
              placeholder='Amount'
            />

            {/* select-type-income */}
            <select
              onChange={(e) => setIncomeType(e.target.value)}
              value={incomeType} className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] cursor-pointer focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50'>
              <option value="" disabled hidden>Type of income</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>

            {/* input-Date */}
            <input
              onChange={(e) => setIncomeDate(e.target.value)}
              value={incomeDate}
              type="date"
              className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50'
            />

            {/* select-type-tax */}
            <select
              onChange={(e) => setIncomeTaxType(e.target.value)}
              value={incomeTaxType}
              className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] cursor-pointer focus:outline-green-600 rounded-xl indent-4 h-11.5 w-50'
            >
              <option value="" disabled hidden>Is it taxable?</option>
              <option value="Taxable">Taxable</option>
              <option value="AfterTax">After tax</option>
            </select>

            <button onClick={addIncome} className='bg-gradient-to-r from-green-500 to-yellow-400 hover:opacity-70 text-white font-medium flex items-center justify-center rounded-lg cursor-pointer h-10 max-w-[300px] w-full'>
              Add income
            </button>
          </div>
        </form>
      </div>

      {/* bottom-area */}
      <div className="bg-white rounded-xl w-full p-4 md:p-8 mt-5">
        {income.length > 0 ? (
          <div className="overflow-x-auto">
            {/* --- TABLE VIEW FOR DESKTOP --- */}
            <div className="hidden xl:block overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 text-[#3f4765]">Amount</th>
                    <th className="text-left p-3 text-[#3f4765]">Type</th>
                    <th className="text-left p-3 text-[#3f4765]">Date</th>
                    <th className="text-left p-3 text-[#3f4765]">Tax Type</th>
                  </tr>
                </thead>
                <tbody>
                  {income.map((item) => (
                    <tr key={item.Id} className="border-t">
                      <td className="p-3 text-lg font-medium text-green-600">
                        {item.Amount} $
                      </td>
                      <td className="p-3 text-lg font-medium text-[#3f4765]">
                        {item.IncomeType}
                      </td>
                      <td className="p-3 text-lg font-medium text-[#3f4765]">
                        {item.IncomeDate}
                      </td>
                      <td className="text-[#3f4765] text-lg font-medium flex items-center justify-between p-3">
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
              {income.map((item) => (
                <div
                  key={item.Id}
                  className="bg-white shadow-md rounded-xl p-4 border space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-green-600 font-bold">{item.Amount} $</span>
                    <button
                      onClick={() => deleteIncome(item.Id)}
                      className="text-sm border border-[#f85842] text-[#f85842] hover:bg-[#f85842] hover:text-white transition-all duration-300 rounded-lg px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Type:</span> {item.IncomeType}
                  </p>
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Date:</span> {item.IncomeDate}
                  </p>
                  <p className="text-[#3f4765] text-sm">
                    <span className="font-semibold">Tax Type:</span> {item.IncomeTaxType}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-[22px] text-[#3f4765] font-medium ">
            No income added yet...
          </h1>
        )}

        {/* total + delete all section */}
        <div className="flex max-md:flex-col max-md:gap-5 justify-between w-full mt-5">
          <h1 className="text-[28px] md:text-[32px] text-[#3f4765] font-bold leading-9">
            Your total income:{" "}
            <span className="text-green-600">{totalIncome} $</span>
          </h1>
          <button
            onClick={deleteAll}
            className="text-white bg-[#f85842] font-medium rounded-xl cursor-pointer hover:bg-[#f84027] transition-all duration-200 max-w-75 w-full h-11.5"
          >
            Delete all
          </button>
        </div>
      </div>



    </div >
  )
}
