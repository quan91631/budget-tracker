import UNCATEGORIZED_BUDGET_ID from '../features/budget/budgetSlice'
import BudgetCard from "./BudgetCard"
import { useSelector } from 'react-redux'

export default function UncategorizedBudgetCard(props) {
  const expenses = useSelector(state => state.expenses)
  console.log(expenses)
    const uncategorizedBudget = expenses.filter(expense => expense.budgetID === UNCATEGORIZED_BUDGET_ID)
    const amount = uncategorizedBudget.reduce(
      (total, expense) => total + expense.amount,
      0
    )
    
    if (amount === 0) return null
  
    return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
  }
  