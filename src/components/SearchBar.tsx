import { useContext } from "react";
import { FilterContext, FilterContextValue } from "../App";

const SearchBar: React.FC = () => {
    const filterContext: FilterContextValue = useContext(FilterContext);

    return (
        <form>
            <label>Search your item:
                <input
                    type="text"
                    onChange={(e) => filterContext.setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    )
}

export default SearchBar;