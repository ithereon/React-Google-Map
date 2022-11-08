import React from 'react';
import PropTypes from 'prop-types';
import './LocationSelect.css';

const LocationSelect = React.memo(({value, options, onChange}) =>
    <select value={value} onChange={onChange} className='location-select paper'>
        {
            options.map((o, i) =>
                <option value={o.id} key={`hub${i}`}>{o.name}</option>
            )
        }
    </select>);

LocationSelect.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};
export default LocationSelect;
