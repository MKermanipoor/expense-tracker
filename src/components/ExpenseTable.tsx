import React, { useContext, useEffect, useRef, useState } from 'react';
import Expense from '../models/Expense';
import axiosInstance from '../api/axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FilterContext, FilterContextValue } from '../App';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface ExpenseRowProps {
  expense: Expense;
  className?: string;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, className }) => {
  return (
    <TableRow key={expense.id}>
      <TableCell className="text-left">{new Date(expense.date).toLocaleDateString()}</TableCell>
      <TableCell className="text-center">{expense.description}</TableCell>
      <TableCell className="text-center"><Badge>{expense.category.title}</Badge></TableCell>
      <TableCell className="text-right">{expense.price}</TableCell>
    </TableRow>

  )
}

const ExpenseTable: React.FC = () => {
  const filterContext: FilterContextValue = useContext(FilterContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const page = useRef<number>(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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
            <TableCell className="text-left">Date</TableCell>
            <TableCell className="text-center">Description</TableCell>
            <TableCell className="text-center">Category</TableCell>
            <TableCell className="text-right">Price</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
        <InfiniteScroll
          dataLength={expenses.length}
          hasMore={hasMore}
          next={fetchExpenses}
          loader={<p>loading...</p>}
          >
          <Table>
            <TableBody>
              {expenses.length > 0 ? expenses.map((expense: Expense, index: number) => <ExpenseRow expense={expense} />) : <></>}
            </TableBody>
          </Table>
        </InfiniteScroll >
    </div >
  );
}

export default ExpenseTable;