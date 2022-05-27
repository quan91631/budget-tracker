import { createSelector, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidV4 } from "uuid"
import { UNCATEGORIZED_BUDGET_ID } from '../budget/budgetSlice'
export const expenseSlice = createSlice({
    name:"expense",
    initialState: [],
    reducers: {
        addExpense: (state, action) =>{
            const {description, amount, budgetID} = action.payload
            state.push({id: uuidV4(), description: description, amount: amount, budgetID: budgetID})
        },
        deleteExpense: (state, action) => {
            return state = state.filter(expense => expense.id !== action.payload)
        },
        onDeleteBudget: (state, action) => {
            state.forEach((expense) => {
               if(expense.budgetID === action.payload){
                expense.budgetID = UNCATEGORIZED_BUDGET_ID
               }
           })
        }
    }
})


export const getExpenseInTheSameBudget = createSelector(
    [
        state => state.expenses,
        (state, id) => id
    ],
    (expenses, id) => expenses.filter(expense => expense.budgetID === id)
)

export const getTotalExpense = createSelector(
    [
        state => state.expenses,
        (state, budgetID) => budgetID
    ],
    (expenses, budgetID) => {
        let total = 0;
        const expensesInTheSameBudget = expenses.filter(expense => expense.budgetID === budgetID)
        total = expensesInTheSameBudget.reduce((total, expense) => total + expense.amount, 0)
        return total
    }
)

export const {addExpense, deleteExpense, onDeleteBudget} = expenseSlice.actions

export default expenseSlice.reducer