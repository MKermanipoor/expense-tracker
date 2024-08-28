import React, { useContext, useEffect, useRef, useState } from 'react';
import Expense from '../models/Expense';
import { default as Item } from "../models/ExpenseItem";
import axiosInstance from '../api/axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FilterContext, FilterContextValue } from '../Routes/Expenses';
import { Skeleton } from './ui/skeleton';
import DynamicIcon from './ui/dynamicIcon';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import Chips from './ui/chips';
import { twMerge } from 'tailwind-merge';

interface ExpenseItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Item;
  first?: boolean
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item, className, first = false, ...props }) => {
  return (
    <div key={item.id} className={twMerge('flex flex-row p-2 rounded-md bg-blue-50 mb-1', className)} {...props}>
      <Label className='w-5/12'>{item.title}</Label>

      <div className='w-6/12 flex justify-center'>
        {item.tag &&
          <Label>{item.tag}</Label>}
      </div>

      <div className='w-1/12 flex justify-end '>
        {item.price &&
          <Label>$ {item.price}</Label>}
      </div>
    </div>
  );
}

interface ExpenseRowProps {
  expense: Expense;
}


const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef]);

  return (
    <div className='border-b px-4' onClick={() => setExpand((preExpand) => !preExpand)}>
      <div className='flex flex-row items-center h-14 py-2'>
        <div className='w-1/12'>
          <Label>{expense.date}</Label>
        </div>

        <div className='w-4/12 flex flex-row item-center'>
          <div className='rounded-full bg-blue-100 p-2'>
            <DynamicIcon icon={expense.category.icon} className='text-lg' />
          </div>
          <Label className='ml-2 my-auto'>{expense.category.title} {expense.store ? 'from ' + expense.store : ''}</Label>
        </div>

        <div className='w-6/12 flex flex-row flex-wrap justify-center gap-1'>
          {expense.tags?.slice(0, 5).map((tag) => <Chips key={tag.id}>{tag.title}</Chips>)}
          {expense.tags && expense.tags.length > 5 && <Chips>+{expense.tags.length - 5}</Chips>}
        </div>

        <div className='w-1/12 flex flex-row-reverse flex-wrap'>
          <Label>$ {expense.price}</Label>
        </div>
      </div>

      {expense.items &&
        <div ref={contentRef} className='overflow-hidden px-2 mb-1 transition-[max-height] rounded'
          style={{ maxHeight: expand ? (contentHeight + 'px') : '0px' }}>
          {expense.items.map((item, index) =>
            <ExpenseItem item={item} key={expense.id + '_' + item.id} first={index === 0} />
          )}
        </div>}
    </div>
  )
}



const ExpensesList: React.FC = () => {
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
      <InfiniteScroll
        dataLength={expenses.length}
        hasMore={hasMore}
        next={fetchExpenses}
        loader={<Skeleton className='h-16 w-full rounded' />}
      >
        {expenses.length > 0 &&
          expenses.map((expense: Expense) =>
            <ExpenseRow expense={expense} key={expense.id} />
          )}
      </InfiniteScroll >
    </div >
  );
}

export default ExpensesList;