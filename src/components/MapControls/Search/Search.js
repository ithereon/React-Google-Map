import React, {useState, memo} from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';
import SearchList from './SearchList';
import NoMatch from './NoMatch';

const Search = memo(({value, locationsList, onChange, onClick, onReset}) => {
    const [open, setOpen] = useState(false);

    function handleClick(item) {
        setOpen(false);
        onClick(item);
    }

    return <div className={[styles.search, 'paper'].join(' ')}>
        {value && <div onClick={onReset} className={styles.close}>&#10006;</div>}
        <input placeholder='Search' className={styles.searchInput} onClick={() => setOpen(true)} onChange={onChange} value={value}/>
        {(open && locationsList) &&
        <>
            {locationsList.length > 0 ?
                <SearchList onClick={handleClick} locationsList={locationsList}/> :
                <NoMatch/>}
        </>
        }
    </div>
});

Search.propTypes = {
    searchValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    locationsList: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};
export default Search;
