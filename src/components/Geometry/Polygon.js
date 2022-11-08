import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Polygon as GPolygon} from "react-google-maps";
import {calcPercentPhones, formatLatLng, setShapeColor} from '../../utils/helpers';

class Polygon extends PureComponent {
    static propTypes = {
        polygon: PropTypes.object,
        onTooltipShow: PropTypes.func,
        onTooltipClose: PropTypes.func
    };
    state = {
        fillOpacity: 0.5,
        strokeOpacity: 0.8,
        color: setShapeColor(calcPercentPhones(this.props.polygon.stores, this.props.polygon.phones))
    };

    handleMouseOver = (e) => {
        this.setState({
            fillOpacity: 0.8,
            strokeOpacity: 1
        });
        this.props.onTooltipShow(this.props.polygon, formatLatLng(e));
    };
    handleMouseOut = () => {
        this.setState({
            fillOpacity: 0.5,
            strokeOpacity: 0.8
        });
        this.props.onTooltipClose();
    };

    render() {
        let {polygon} = this.props;
        let {strokeOpacity, fillOpacity, color} = this.state;

        return (
            <GPolygon
                options={{
                    strokeColor: '#fff',
                    strokeOpacity: strokeOpacity,
                    strokeWeight: 1,
                    fillColor: color,
                    fillOpacity: fillOpacity
                }}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                paths={polygon.coordinates}
            />
        )
    }

};


export default Polygon;


