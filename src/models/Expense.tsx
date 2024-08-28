import ExpenseItem from "./ExpenseItem";
import ExpenseType from "./ExpenseType";

interface ExpenseTag{
  id: string,
  title: string
}

interface Expense {
  id: string;
  category: ExpenseType;
  store?: string;
  date: string;
  price: number;
  tags?: ExpenseTag[]
  items?: ExpenseItem[];
}

export default Expense;