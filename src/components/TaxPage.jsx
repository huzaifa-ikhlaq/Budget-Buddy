import { useContext, useState } from 'react'
import { context } from '../context/context'

export default function TaxPage() {
  const { income, totalIncome, totalTax, setTotalTax } = useContext(context);

  // State
  const [filingStatus, setFilingStatus] = useState("");
  const [useDeduction, setUseDeduction] = useState(true);
  const [deductionValue, setDeductionValue] = useState("");
  const [stateTax, setStateTax] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [ficaTax, setFicaTax] = useState(0);


  // Taxable income
  const taxableIncome = income
    .filter(item => item.IncomeTaxType === "Taxable")
    .reduce((acc, curr) => acc + Number(curr.Amount), 0);

  // Handle calculation
  const handleCalculate = () => {
    let incomeAfterDeduction = taxableIncome;

    if (!useDeduction) {
      incomeAfterDeduction -= deductionValue ? Number(deductionValue) : 0;
      if (incomeAfterDeduction < 0) incomeAfterDeduction = 0;
    }

    let federalRate = 0.1;
    if (filingStatus === "Single") {
      federalRate = 0.12;
    } else if (filingStatus === "Married") {
      federalRate = 0.1;
    }

    const fedTax = incomeAfterDeduction * federalRate;
    const stTax = incomeAfterDeduction * 0.05;
    const fiTax = incomeAfterDeduction * 0.0765;

    const total = fedTax + stTax + fiTax;

    setFederalTax(fedTax);
    setStateTax(stTax);
    setFicaTax(fiTax);
    setTotalTax(total);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="bg-white flex max-[992px]:flex-col justify-between items-center rounded-xl w-full p-4 md:p-8 max-[992px]:gap-6 ">
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          {/* Filing Status */}
          <select
            value={filingStatus}
            onChange={e => setFilingStatus(e.target.value)}
            className='bg-white text-lg text-[#5a6078] font-semibold border border-[#bcbec7] focus:outline-green-600 rounded-xl indent-4 h-11.5 w-full max-w-[298px]'
          >
            <option value="" disabled hidden>Filing status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>

          {/* Standard Deduction */}
          <div className="flex max-sm:flex-col items-center gap-3">
            <span className="text-[#3f4765] text-xl font-semibold whitespace-nowrap">Use standard deduction:</span>
            <span className='flex gap-4 items-center'>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="deduction"
                  className="form-radio"
                  checked={useDeduction}
                  onChange={() => setUseDeduction(true)}
                />
                <span className='text-lg text-[#3f4765] font-medium'>Yes</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="deduction"
                  className="form-radio text-green-500"
                  checked={!useDeduction}
                  onChange={() => setUseDeduction(false)}
                />
                <span className='text-lg text-[#3f4765] font-medium'>No</span>
              </label>
            </span>
          </div>

          {/* Deduction Value (only when "No") */}
          {!useDeduction && (
            <input
              type="number"
              value={deductionValue}
              onChange={e => setDeductionValue(e.target.value)}
              className='bg-[#F5F5F5] text-lg font-semibold focus:outline-green-600 rounded-xl indent-4 h-11.5 max-w-[298px] mt-3'
              placeholder='set your deductions'
            />
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className='bg-gradient-to-r from-green-500 to-yellow-400 hover:opacity-70 text-white font-medium flex items-center justify-center rounded-lg cursor-pointer h-10 max-w-[300px] w-full'
          >
            Calculate
          </button>
        </div>

        {/* Right Side */}
        <div className="text-[#868da3] text-xl font-medium leading-6 w-full max-w-115">
          <p>
            Here you can calculate the approximate amount of money that you need to pay
          </p>
          <p>
            It takes the income that you marked Taxable and calculates % that you need to pay based on your filing status, amount of deductions, amount of income, federal tax rates and <span className="text-2xl font-semibold text-[#3f4765]">2022 VA State tax rates</span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-xl flex flex-col gap-3 mt-4 p-4 md:p-8">
        <p className="text-[#3f4765] text-lg sm:text-xl font-semibold whitespace-nowrap">
          State tax: <span className="text-2xl font-semibold">{stateTax.toFixed(2)} $</span>
        </p>
        <p className="text-[#3f4765] text-lg sm:text-xl font-semibold whitespace-nowrap">
          Federal tax: <span className="text-2xl font-semibold">{federalTax.toFixed(2)} $</span>
        </p>
        <p className="text-[#3f4765] text-lg sm:text-xl font-semibold whitespace-nowrap">
          FICA tax: <span className="text-2xl font-semibold">{ficaTax.toFixed(2)} $</span>
        </p>
        <p className="text-[#3f4765] text-lg sm:text-xl font-semibold whitespace-nowrap">
          Your income before taxes: <span className="text-green-600 text-2xl font-semibold">{totalIncome} $</span>
        </p>
        <p className="text-[#3f4765] text-lg sm:text-xl font-semibold whitespace-nowrap">
          You need to pay: <span className="text-red-500 text-2xl font-semibold">{totalTax.toFixed(2)} $</span>
        </p>
      </div>
    </div>
  )
}
