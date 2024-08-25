import { useContext } from "react";
import { FilterContext, FilterContextValue } from "../App";
import styles from "../style/searchBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from "./ui/input";

const SearchBar: React.FC = () => {
    const filterContext: FilterContextValue = useContext(FilterContext);

    return (
        <div className={styles["search-bar"]}>
            <FontAwesomeIcon icon={faSearch} />
            <Input type="text" placeholder="Search..." className={styles["search-bar"]}
            onChange={(e) => filterContext.setSearchTerm(e.target.value)}/>
        </div>
    )
}

export default SearchBar;