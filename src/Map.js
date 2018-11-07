import React, { PureComponent } from 'react';
import './Map.css';


// Credit to this ---> https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
// for helping me create a Google Map component
// This uses reacts PureComponent class to prevent infinite rerendering upon updates
class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
    };
  } 
  
  // Create and append script tag that calls to Google's map API
  componentDidMount() {
    const GMapsKey = 'AIzaSyCPqE2gTI9OwdjkIwi0FDNAUfyLF44Pq7k';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMapsKey}`;
    script.async = true;
    script.onerror = () => alert('Google Maps has experienced an error');
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });
    document.body.appendChild(script);
    // Global function for handling authentication failures as per Google's Documentation
    window.gm_authFailure = () => alert('Google Maps API authentication has failed');
  }

  // Configure map and populate it with markers
  componentDidUpdate() {
    if (this.state.mapIsReady) {
      const roanoke = {
        lat: 37.270969,
        lng: -79.941429,
      }
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: roanoke,
        mapTypeControl: false,
        streetViewControl: false,
        // Styles taken from Google's "night mode" documentation
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      })
      const google = window.google.maps;
      const map = this.map;
      const restaurants =  this.props.restaurants;
      this.props.setMarkers(google, map, restaurants);
    }
  }

  render() {
    return (
      <section id="map" aria-label="map of Roanoke, Virginia" role="application"></section>
    );
  }
}

export default Map;