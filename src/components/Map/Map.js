import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Polygon from '../Geometry/Polygon';
import Polyline from '../Geometry/Polyline';
import Tooltip from '../Tooltip/Tooltip';
import withTooltip from "../Tooltip/withTooltip";
import { GeometryPicker } from '../MapControls';
import { Legend } from '../Legend';
import { LocationSelect } from "../MapControls/LocationSelect";
import { Search } from "../MapControls/Search";
import './map.css';
class Map extends PureComponent {
    static propTypes = {
        mapData: PropTypes.object,
        onTooltipShow: PropTypes.func,
        onTooltipClose: PropTypes.func,
        tooltipData: PropTypes.object,
        tooltipOpen: PropTypes.bool,
        tooltipPosition: PropTypes.object
    };
    state = {
        defaultCenter: this.props.mapData.hubs[0].coordinates,
        hubs: this.props.mapData.hubs,
        selectedHub: this.props.mapData.hubs[0] ? this.props.mapData.hubs[0].id : null,
        showPolygonsHfc: true,
        showPolygonsFtth: true,
        showPolylines: true,
        searchValue: '',
        searchLocationsList: null,
        showSearchMarker: false
    };
    toggleGeometryRender = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] });
    };
    handleLocationChange = (e) => {
        this.setState({
            selectedHub: e.target.value,
            center: this.state.hubs.filter(hub => hub.id === +e.target.value)[0].coordinates
        });
    };
    handleSearch = e => {
        let value = e.target.value.toLowerCase();
        this.setState({
            searchValue: e.target.value
        }, () => {
            if (value.length > 2) {
                let { polygons } = this.props.mapData;
                this.setState({
                    searchLocationsList: polygons.filter(item => item.name.toLowerCase().indexOf(value) >= 0)
                })
            } else if (value && this.state.searchLocationsList) {
                this.setState({
                    searchLocationsList: null
                })
            }
        });

    };
    handleSearchLocationCenter = (item) => {
        if (item.pointCoordinates) {
            this.setState({
                center: item.pointCoordinates,
                searchValue: item.name,
                searchLocationsList: null,
                showSearchMarker: true
            });
        }
    };
    handleResetSearch = () => {
        this.setState({
            searchValue: '',
            searchLocationsList: null,
            showSearchMarker: false
        });
    };

    render() {
        let { mapData, tooltipOpen, tooltipPosition, tooltipData, onTooltipClose, onTooltipShow } = this.props;
        let {
            showPolygonsHfc,
            showPolygonsFtth,
            showPolylines,
            hubs,
            selectedHub,
            center, searchValue, showSearchMarker, searchLocationsList
        } = this.state;

        let mapProps = {};
        if (center) {
            mapProps.center = center;
        }

        return (
            <GoogleMap
                {...mapProps}
                defaultZoom={13}
                defaultCenter={this.state.defaultCenter}>
                <div className='search-wrapper'>
                    {hubs.length > 0 &&
                        <LocationSelect
                            value={selectedHub.id}
                            onChange={this.handleLocationChange}
                            options={hubs} />}
                    <Search
                        onClick={this.handleSearchLocationCenter}
                        onChange={this.handleSearch}
                        onReset={this.handleResetSearch}
                        value={searchValue}
                        locationsList={searchLocationsList} />
                </div>
                <Legend />
                {showSearchMarker && <Marker position={center} />}
                <GeometryPicker
                    data={{
                        showPolygonsHfc: {
                            label: 'Planos HFC',
                            value: this.state.showPolygonsHfc
                        },
                        showPolygonsFtth: {
                            label: 'Planos FTTH',
                            value: this.state.showPolygonsFtth
                        },
                        showPolylines: {
                            label: 'Anillos de fibra',
                            value: this.state.showPolylines
                        },
                    }}
                    onChange={this.toggleGeometryRender} />


                {(tooltipOpen && tooltipPosition) &&
                    <Tooltip
                        onCloseClick={this.props.onTooltipClose}
                        position={tooltipPosition}
                        data={tooltipData} />}

                {(mapData.polygons.length > 0) &&
                    mapData.polygons.map((polygon, index) => {
                        if (!polygon.name.endsWith("F") && showPolygonsHfc) {
                            return <Polygon
                                key={`polygonHfc${index}`}
                                onTooltipClose={onTooltipClose}
                                onTooltipShow={onTooltipShow}
                                polygon={polygon}
                            />
                        }
                        if (polygon.name.endsWith("F") && showPolygonsFtth) {
                            return <Polygon
                                key={`polygonFtth${index}`}
                                onTooltipClose={onTooltipClose}
                                onTooltipShow={onTooltipShow}
                                polygon={polygon}
                            />
                        }
                        return <></>;
                    }
                    )}

                {(mapData.polylines.length > 0) && showPolylines &&
                    mapData.polylines.map((polyline, index) =>
                        <Polyline
                            onTooltipClose={onTooltipClose}
                            onTooltipShow={onTooltipShow}
                            key={`polyline${index}`}
                            polyline={polyline}
                        />)}
            </GoogleMap>
        )
    }
};


export default withTooltip(withScriptjs(withGoogleMap(Map)));


