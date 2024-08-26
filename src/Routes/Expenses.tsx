import { createContext, ReactNode, useState } from 'react';
import ExpenseTable from '../components/ExpenseTable';
import SearchBar from '../components/SearchBar';

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

const Expenses: React.FC = () => {
    return (
        <FilterProvider>
            <SearchBar />
            <ExpenseTable />
        </FilterProvider>
    )
}

export default Expenses;