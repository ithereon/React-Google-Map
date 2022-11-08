import React, {Component} from 'react';
import './App.css';
import Map from './components/Map/Map';

import {loadData, parseMapData} from './utils/helpers';

class App extends Component {
    state = {
        mapData: null,
    };

    async componentDidMount() {
        let fileData = await loadData(`${process.env.PUBLIC_URL}/data/data.json`);
        let stats = await loadData(`${process.env.PUBLIC_URL}/data/stats.json`);
        if (fileData && fileData.features && stats) {
            this.setState({mapData: parseMapData(fileData.features, stats)});
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.mapData &&
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
                    loadingElement={<div className='loadingElement'/>}
                    containerElement={<div className='containerElement'/>}
                    mapElement={<div className='mapElement'/>}
                    mapData={this.state.mapData}
                />}

            </div>
        );
    }
}

export default App;
