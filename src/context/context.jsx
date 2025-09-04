import { createContext, useState, useEffect } from "react";

export const context = createContext();

export const IncomeProvider = ({ children }) => {
    // Income context 
    const [income, setIncome] = useState(() => {
        const saved = localStorage.getItem('income')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('income', JSON.stringify(income))
    }, [income])


    // calculate Total Income
    const totalIncome = income.reduce((acc, curr) => acc + curr.Amount, 0)

    // Income context 
    const [expense, setExpense] = useState(() => {
        const saved = localStorage.getItem('expense')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('expense', JSON.stringify(expense))
    }, [expense])

    // calculate Total expense 
    const totalExpense = expense.reduce((a, b) => a + b.Amount, 0)

    // Tax page 
    const [totalTax, setTotalTax] = useState(0);

    return (
        <context.Provider value={{ income, setIncome, totalIncome, expense, setExpense, totalExpense, totalTax, setTotalTax }}>
            {children}
        </context.Provider>
    )
}