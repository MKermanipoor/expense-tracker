import ExpenseType from "./ExpenseType";

interface Expense {
    id: string;
    date: string;
    price: number;
    category: ExpenseType;
    description: string;
    unit?: number;
  }

export default Expense;