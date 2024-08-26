import React, { useContext, useEffect, useRef, useState } from 'react';
import Expense from '../models/Expense';
import axiosInstance from '../api/axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FilterContext, FilterContextValue } from '../Routes/Expenses';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import ExpenseDialog from './ExpenseDialog';
import { Skeleton } from './ui/skeleton';

interface ExpenseRowProps {
  expense: Expense;
  onClick?: () => void;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onClick }) => {
  return (
    <TableRow key={expense.id} onClick={() => onClick && onClick()}>
      <TableCell className="w-1/6 text-left">{new Date(expense.date).toLocaleDateString()}</TableCell>
      <TableCell className="w-2/6 text-center">{expense.description}</TableCell>
      <TableCell className="w-2/6 text-center"><Badge>{expense.category.title}</Badge></TableCell>
      <TableCell className="w-1/6 text-right">{expense.price}</TableCell>
    </TableRow>

  )
}



const ExpenseTable: React.FC = () => {
  const filterContext: FilterContextValue = useContext(FilterContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const page = useRef<number>(0);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [selectedExpense, setSelectedEspense] = useState<Expense | null>(null);

  const fetchExpenses = () => {

    axiosInstance.get("/", {
      params: {
        page: page.current,
        search: filterContext.searchTerm
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          setExpenses((prevExpenses) => [...prevExpenses, ...response.data]);
          page.current += 1;
        } else if (response.status === 204) {
          setHasMore(false);
        }
      });
  }

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      page.current = 0;
      setExpenses([]);
      setHasMore(true);
      fetchExpenses();
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    }
  }, [filterContext.searchTerm]);



  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="w-1/6 text-left">Date</TableCell>
            <TableCell className="w-2/6 text-center">Description</TableCell>
            <TableCell className="w-2/6 text-center">Category</TableCell>
            <TableCell className="w-1/6 text-right">Price</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <InfiniteScroll
        dataLength={expenses.length}
        hasMore={hasMore}
        next={fetchExpenses}
        loader={<Skeleton className='h-16 w-full rounded'/>}
      >
        <Table>
          <TableBody>
            {expenses.length > 0 &&
              expenses.map((expense: Expense) =>
                <ExpenseRow expense={expense}
                  onClick={() => setSelectedEspense(expense)} />
              )}
          </TableBody>
        </Table>
      </InfiniteScroll >
      <ExpenseDialog expense={selectedExpense} onClose={() => setSelectedEspense(null)}/>
    </div >
  );
}

export default ExpenseTable;