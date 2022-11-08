import React, {memo} from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';

const SearchListItem = memo(({item, onClick}) => {
    return <div className={styles.locationsListItem}
                onClick={() => {onClick(item);}}>{item.name}</div>
});

SearchListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};
export default SearchListItem;
