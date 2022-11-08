import React from 'react';
import PropTypes from 'prop-types';
import './GeometryPicker.css';
import Checkbox from './Checkbox';

const GeometryPicker = React.memo(({data, onChange}) =>
    <div className='checkbox-wrapper paper'>
        {
            Object.keys(data).map(key => {
                return <Checkbox key={key} name={key} onChange={onChange} text={data[key].label} checked={data[key].value}/>
            }
            )
        }
    </div>);
GeometryPicker.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
export default GeometryPicker;
