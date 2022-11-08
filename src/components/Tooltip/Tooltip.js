import React from 'react';
import PropTypes from 'prop-types';
import {InfoWindow as GInfoWindow} from "react-google-maps";
import TooltipRow from './TooltipRow';
import {calcPercentPhones} from "../../utils/helpers";

const Tooltip = ({position, data, onCloseClick}) => {
    let {name, stores, phones, date, tecnologia} = data;
    return (
        <GInfoWindow position={position} onCloseClick={onCloseClick}>
            <div>
                <TooltipRow label='Name' text={name}/>
                {stores !== undefined && <TooltipRow label={process.env.REACT_APP_STORES} text={stores}/>}
                {phones !== undefined && <TooltipRow label={process.env.REACT_APP_PHONES} text={phones}/>}
                {(phones !== undefined && stores !== undefined) &&
                <TooltipRow label='Ocupacion' text={`${calcPercentPhones(stores, phones)}%`}/>}
                {date && <TooltipRow label='Fecha Act.' text={date}/>}
                <TooltipRow label='Tecnologia' text={tecnologia === undefined ? 'Unknown' : tecnologia}/>
            </div>
        </GInfoWindow>
    )
};

Tooltip.propTypes = {
    position: PropTypes.object.isRequired,
    data: PropTypes.object,
    onCloseClick: PropTypes.func.isRequired
};
export default Tooltip;


