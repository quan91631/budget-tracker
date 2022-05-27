import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from '../features/budget/budgetSlice'
import expenseReducer from '../features/expense/expenseSlice'

const rootReducer = {
  budgets : budgetReducer,
  expenses: expenseReducer
}

export const store = configureStore({
  reducer: rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})