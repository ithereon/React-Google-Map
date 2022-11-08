import React, {memo} from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';
import SearchListItem from './SearchListItem';

const SearchList = memo(({value, locationsList, onClick}) =>
    <div className={[styles.locationsList, 'paper'].join(' ')}>
        {locationsList.map((item, index) =>
            <SearchListItem item={item} className={styles.locationsListItem}
                            onClick={onClick}
                            key={`searchItem${index}`}/>
        )}
    </div>
);

SearchList.propTypes = {
    locationsList: PropTypes.array,
    onClick: PropTypes.func.isRequired
};
export default SearchList;
