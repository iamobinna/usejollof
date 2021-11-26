/*global google*/
import React, { Component } from "react";
import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer, Marker, Polyline
} from "react-google-maps";
import van from '../../svg/van.svg';
import location from '../../svg/location.svg';
class Map extends Component {
    state = {
        coords: null,
        directions: null,
        origin: this.props.startLocation,
        destination: this.props.endLocation
};

componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
        {
            origin: this.state.origin,
            destination: this.state.destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result);
                const coords = result.routes[0].overview_path;
                this.setState({coords});
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

render() {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={this.state.origin}
            defaultZoom={13}
        >
            <Polyline
            path={this.state.coords}
            geodesic={true}
            options={{
              strokeColor: "rgb(0,100,200)",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              clickable: true
            }}
          />
            {/* <DirectionsRenderer
                directions={this.state.directions}
            />*/}
            <Marker icon={{
                url: van,
                scaledSize: new google.maps.Size(25, 25)
            }} position={this.state.origin} />
            <Marker icon={{
                url: location,
                scaledSize: new google.maps.Size(25, 25)
            }} position={this.state.destination} />
        </GoogleMap>
    ));

    return (
        <div style={{height: `100%`, width: "100%"}} >
            <GoogleMapExample
                containerElement={<div style={{ height: `100%`, width: "100%" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>


       );
    }
}

export default Map;