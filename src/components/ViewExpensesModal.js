import { Modal, Button, Stack } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteBudget, UNCATEGORIZED_BUDGET_ID } from "../features/budget/budgetSlice"
import { deleteExpense, getExpenseInTheSameBudget, onDeleteBudget } from "../features/expense/expenseSlice"
import { currencyFormatter } from "../ultis"

export default function ViewExpensesModal({ budgetId, handleClose }) {
//   const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
  // const expenses = useSelector(state => state.expenses)
  const budgets = useSelector(state => state.budgets)
  const dispatch = useDispatch()
  const expenseWithSameBudget = useSelector(
    state => getExpenseInTheSameBudget(state, budgetId)
    )
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  dispatch(onDeleteBudget(budgetId))
                  dispatch(deleteBudget(budgetId))  
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenseWithSameBudget.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => {
                    let id = expense.id
                    dispatch(deleteExpense(id))
                  }
                }
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
