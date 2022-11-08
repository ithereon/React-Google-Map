import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Polyline as GPolyline} from "react-google-maps";
import {formatLatLng} from "../../utils/helpers";

const COLORS = [
    '#4caf50',
    '#03a9f4',
    '#00bcd4',
    '#ff5722',
    '#f44336',
    '#9c27b0',
    '#673ab7',
    '#ffc107',
    '#cddc39',
    '#009688'
];

class Polyline extends PureComponent {
    static propTypes = {
        polyline: PropTypes.object,
        onTooltipShow: PropTypes.func,
        onTooltipClose: PropTypes.func
    };
    state = {
        strokeOpacity: 0.8,
        strokeWeight: 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
    handleMouseOver = (e) => {
        this.setState({
            strokeOpacity: 1,
            strokeWeight: 4
        });
        this.props.onTooltipShow(this.props.polyline, formatLatLng(e));
    };
    handleMouseOut = () => {
        this.setState({
            strokeOpacity: 0.8,
            strokeWeight: 3
        });
        this.props.onTooltipClose();
    };

    render() {
        let {polyline} = this.props;
        let {color, strokeOpacity, strokeWeight} = this.state;
        return (
            <GPolyline
                options={{
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: strokeOpacity,
                    strokeWeight: strokeWeight
                }}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                path={polyline.coordinates}/>
        )
    }

};


export default Polyline;


