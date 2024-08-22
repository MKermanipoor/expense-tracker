import { useContext } from "react";
import { FilterContext, FilterContextValue } from "../App";
import styles from "../style/searchBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
    const filterContext: FilterContextValue = useContext(FilterContext);

    return (
        <div className={styles["search-bar"]}>
            <FontAwesomeIcon icon={faSearch} />
            <input
                type="text"
                onChange={(e) => filterContext.setSearchTerm(e.target.value)}
                placeholder='Search'
            />
        </div>
    )
}

export default SearchBar;