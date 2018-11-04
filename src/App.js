import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import RestaurantList from './RestaurantList';
import FilterByRating from './FilterByRating';
import FilterByPrice from './FilterByPrice';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			googleMap: null,
			markers: null,
			priceFilter: '$',
			ratingFilter: 0,
			restaurants: [],
			selectedRestaurants: [],
		}
		this.setFilters = this.setFilters.bind(this);
		this.setMarkers = this.setMarkers.bind(this);
	}

	setFilters(event, property) {
		const value = event.target.value;
		if (property === 'priceFilter') {
			const price = value;
			const rating = this.state.ratingFilter;
			let fullList = this.state.restaurants.slice(0);
			let filteredList = fullList.filter(function(elem) {
				if (elem.price) {
					return (elem.price.split('').length <= price.split('').length && elem.rating > +rating);
				}
				else {
					return elem.rating > +rating;
				}
			})
			this.setState({
				priceFilter: value,
				selectedRestaurants: filteredList,
			})
		}
		else {
			const price = this.state.priceFilter;
			const rating = value;
			let fullList = this.state.restaurants.slice(0);
			let filteredList = fullList.filter(function(elem) {
				if (elem.price) {
					return (elem.price.split('').length <= price.split('').length && elem.rating > +rating);
				}
				else {
					return elem.rating > +rating;
				}
			})
			this.setState({
				ratingFilter: value,
				selectedRestaurants: filteredList,
			})
		}
	}

	setMarkers(google, map, restaurants) {
		console.log(restaurants)
		const markers = [];
		let largeInfoWindow = new google.InfoWindow();
		for (let i = 0; i < restaurants.length; i++){
		 	const marker = new google.Marker({
	      position: {lat: restaurants[i].coordinates.latitude, lng: restaurants[i].coordinates.longitude},
	      icon: {
	        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
	      },  
	      map: map,
	      id: restaurants[i].id,
	    })
	    markers.push(marker);
	    marker.addListener('click', function(){
	    	const marker = this;
	    	populateInfoWindow(marker, largeInfoWindow, map, restaurants[i]);
	    	setTimeout(function() {
	    		marker.setAnimation(null);	
	    	}, 1000)
	    	marker.setAnimation(google.Animation.BOUNCE)
	    })
		}
		function populateInfoWindow(marker, infowindow, map, restaurant) {
			if (infowindow.marker !== marker) {
				infowindow.marker = marker;
				infowindow.setContent(`<h2>${restaurant.name}</h2>
															<p>Rating: ${restaurant.rating ? restaurant.rating : 'Unavailable'} Price: ${restaurant.price ? restaurant.price : 'Unavailable'}</p>
															<img alt=${restaurant.name} src=${restaurant.image_url}>
															<p>${restaurant.is_open ? 'Open' : 'Closed'}</p>
															<p>${restaurant.location.address1} ${restaurant.location.address2}, ${restaurant.location.city} ${restaurant.location.zip_code}</p>
															<p>${restaurant.display_phone}</p>`)

				infowindow.open(map, marker);
				infowindow.addListener('closeclick', function(){
					infowindow.setMarker(null);
				});
			}
		}
  	this.setState({
  		markers: markers,
  		googleMap: google,
  	})
	}

	componentDidMount() {
		fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=mexican+food&location=roanoke+va', {
			headers: {
				Authorization: 'Bearer wbY30-AwuCYL_fcal_TlDsx3725sox4hMSMH_YwS8pFGpGTHs1g7dqD3tDTbVuMSkrXoupbKjRktLpgR_VvePtm1SQW-5x7zRIsvf4OD1zNWqLfEpEIKYP-LBx3eW3Yx'
			}
		}).then(response => response.json()).then(response => {
			this.setState({restaurants:response.businesses, selectedRestaurants:response.businesses})
		}).catch(err => console.error(err))
	}

  render() {
    return (
      <div className="App">
      	<FilterByRating onChange={this.setFilters}/>
      	<FilterByPrice onChange={this.setFilters}/>
      	<RestaurantList restaurants={this.state.selectedRestaurants} google={this.state.googleMap} markers={this.state.markers}/>
        <Map restaurants={this.state.selectedRestaurants} setMarkers={this.setMarkers}/>
      </div>
    );
  }
}

export default App;
