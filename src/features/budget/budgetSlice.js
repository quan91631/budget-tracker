import { createSlice, createSelector } from '@reduxjs/toolkit'
import { v4 as uuidV4 } from "uuid"

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const budgetSlice = createSlice({
    name:"budget",
    initialState: [],
    reducers: {
        addBudget: (state, action) =>{
            const {name, max} = action.payload
            if(state.find(budget => budget.name === name))
                state.find(budget => budget.name === name).max = max
            else 
                state.push({id: uuidV4(), name: name, max: max})
        },
        deleteBudget: (state, action) => {
            return state = state.filter((budget) => budget.id !== action.payload)
        }
    }
})
// Create a selector with budget ID
export const getBudgetWithID = createSelector(
    [
        state => state.budgets,
        (state, id) => id
    ],
    (budgets, id) => budgets.find(budget => budget.id === id)    
)


export const {addBudget, deleteBudget} = budgetSlice.actions



export default budgetSlice.reducer