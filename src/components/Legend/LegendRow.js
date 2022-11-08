import React from 'react';
import PropTypes from 'prop-types';

const LegendRow = ({color, label}) =>
    <div className='legend-row'>
        <div className={`legend-row-color ${color}`} />
        <div className='legend-row-label'>{label}</div>
    </div>;
LegendRow.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
export default LegendRow;
