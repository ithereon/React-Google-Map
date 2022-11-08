export const loadData = async (url, throwError = false) => {
    try {
        let response = await fetch(url, {method: 'GET'});
        return await response.json();
    } catch (e) {
        console.log(`%c Error: ${e.message}. JSON is broken or file ${url} doesn't exist. `, 'background: #222; color: red');
        if (throwError) {
            throw Error(`Error: JSON is broken or file ${url} doesn't exist.`);
        }
    }
};
export const formatLatLng = (e) => {
    return {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
    };
};
const formatCoordinates = (coordinates) => {
    return coordinates.map(coords => {
        return {
            lat: coords[1],
            lng: coords[0]
        }
    });
};

const createGeometryItem = (mapData, coordinates, stats) => {
    let item = {
        name: mapData.properties.Name,
        coordinates: formatCoordinates(coordinates)
    };

    if (stats[mapData.properties.Name] !== undefined) {
        item.stores = stats[mapData.properties.Name][process.env.REACT_APP_STORES];
        item.phones = stats[mapData.properties.Name][process.env.REACT_APP_PHONES];
        item.date = stats[mapData.properties.Name][process.env.REACT_APP_FECHA_ACT];
        item.tecnologia = stats[mapData.properties.Name][process.env.REACT_APP_TECNOLOGIA];
    }
    return item;
};

const isHub = (mapData) => mapData.properties.Name.toLowerCase().indexOf('hub') !== -1;

export const parseMapData = (mapData, stats) => {
    let polygons = [];
    let polylines = [];
    let hubs = [];
    for (let i = 0; i < mapData.length; i++) {

        if (isHub(mapData[i])) {
            hubs.push({
                id: hubs.length + 1,
                name: mapData[i].properties.Name,
                coordinates: {
                    lat: mapData[i].geometry.coordinates[1],
                    lng: mapData[i].geometry.coordinates[0]
                }
            });
        }

        if (mapData[i].geometry.type === 'Polygon') {
            let coordinates = mapData[i].geometry.coordinates[0];

            let item = createGeometryItem(mapData[i], coordinates, stats);

            let pointCoordinates = null;
            if (mapData[i + 1] !== undefined && mapData[i + 1].geometry.type === 'Point') {
                pointCoordinates = {
                    lat: mapData[i + 1].geometry.coordinates[1],
                    lng: mapData[i + 1].geometry.coordinates[0]
                };
            }
            if (pointCoordinates) {
                item.pointCoordinates = pointCoordinates;
            }

            polygons.push(item)
        }

        if (mapData[i].geometry.type === 'LineString') {
            let coordinates = mapData[i].geometry.coordinates;
            polylines.push(createGeometryItem(mapData[i], coordinates, stats));
        }
    }
    return {
        hubs,
        polygons,
        polylines
    };
};

export const calcPercentPhones = (stores, phones) => {
    if (stores === undefined || phones === undefined) return undefined;
    if (stores === 0 || phones === 0) return 0;
    return parseFloat((stores / phones) * 100).toFixed(1);
};

export const COLORS = {
    red: 'red',
    orange: 'orange',
    yellow: 'yellow',
    green: 'green',
    blue: 'blue',
    purple: 'purple',
    black: 'black',
    white: 'white',
    magenta: 'magenta',
    lime: 'lime'
};

export const setShapeColor = (percent) => {
    if (percent === 0) {
        return COLORS.purple;
    } else if (percent > 0 && percent <= 20) {
        return COLORS.red;
    } else if (percent > 20 && percent <= 30) {
        return COLORS.orange;
    } else if (percent > 30 && percent <= 40) {
        return COLORS.yellow;
    } else if (percent > 40 && percent <= 50) {
        return COLORS.green;
    } else if (percent > 50 && percent <= 80) {
        return COLORS.blue;
    } else if (percent > 80 && percent <= 100) {
        return COLORS.lime;
    }else if (percent > 100) {
        return COLORS.black;
    } else {
        return COLORS.black;
    }
};
