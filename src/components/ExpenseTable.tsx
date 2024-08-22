import React, { useContext, useEffect, useRef, useState } from 'react';
import Expense from '../models/Expense';
import axiosInstance from '../api/axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FilterContext, FilterContextValue } from '../App';

interface ExpenseRowProps {
  expense: Expense;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
  return (
    <tr key={expense.id}>
      <td>{expense.id}</td>
      <td>{new Date(expense.date).toLocaleDateString()}</td>
      <td>{expense.category.title}</td>
      <td>{expense.description}</td>
      <td>{expense.price}</td>
    </tr>
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
    <InfiniteScroll
      dataLength={expenses.length}
      hasMore={hasMore}
      next={fetchExpenses}
      loader={<p>loading...</p>}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? expenses.map((expense: Expense) => <ExpenseRow expense={expense}/>) : <></>}
        </tbody>
      </table>
    </InfiniteScroll >

  );
}

export default ExpenseTable;