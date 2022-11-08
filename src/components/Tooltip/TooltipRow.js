import React from 'react';
import PropTypes from 'prop-types';

const TooltipRow = ({label, text}) => <p><b>{label}:</b> {text}</p>;

TooltipRow.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default TooltipRow;


