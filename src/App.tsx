import React, { createContext, ReactNode, useState } from 'react';
import './App.css';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';
import './style/mainPage.css'

export interface FilterContextValue {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const FilterContext = createContext<FilterContextValue>({
  searchTerm: '',
  setSearchTerm: () => { },
});

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <FilterContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <FilterProvider>
      <div className="main">
        {process.env.REACT_APP_DEBUG ? <h1>Debug Env</h1> : <></>}

        <div className='search-box'>
          <SearchBar />

        </div>
        <div className='table-box'>
          <ExpenseTable />
        </div>
      </div>
    </FilterProvider>
  );
}

export default App;
