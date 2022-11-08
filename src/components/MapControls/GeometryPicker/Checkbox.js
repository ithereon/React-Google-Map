import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';


const Checkbox = React.memo(({text, name, checked, onChange}) =>
    <div className='label-wrapper'>
        <label>
            <input checked={checked} onChange={onChange} type="checkbox" name={name}/>
            {text}
        </label>
    </div>);
Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};
export default Checkbox;
