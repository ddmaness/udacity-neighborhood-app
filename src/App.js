import React, { Component } from 'react';
import './base.css';
import Map from './Map';
import RestaurantList from './RestaurantList';
import FilterByRating from './FilterByRating';
import FilterByPrice from './FilterByPrice';
import MenuBurger from './MenuBurger'

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
			menuState: 'menu-hide',
		}
		this.setFilters = this.setFilters.bind(this);
		this.setMarkers = this.setMarkers.bind(this);
		this.toggleNav = this.toggleNav.bind(this);
	}

	// Filters locations shown based on user input
	setFilters(event, property) {
		const value = event.target.value;
		// If filter adjusted was price, filter items based on user input and rating stored in state
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
		// If filter adjusted was rating, filter items based on user input and price stored in state
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

	// Toggle navigation menu
	toggleNav() {
		if(this.state.menuState === 'menu-hide'){
			this.setState({
				menuState: 'menu-show',
			})
		}
		else {
			this.setState({
				menuState: 'menu-hide',
			})	
		}
	}

	// Set markers on map based on restaurant coordinates
	setMarkers(google, map, restaurants) {
		const markers = [];
		let largeInfoWindow = new google.InfoWindow();
		for (let i = 0; i < restaurants.length; i++) {
		 	const marker = new google.Marker({
	      position: {lat: restaurants[i].coordinates.latitude, lng: restaurants[i].coordinates.longitude},
	      icon: {
	        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
	      },  
	      map: map,
	      id: restaurants[i].id,
	    })
	    markers.push(marker);
	    // Have markers open infowindow when clicked
	    marker.addListener('click', function() {
	    	const marker = this;
	    	populateInfoWindow(marker, largeInfoWindow, map, restaurants[i]);
	    	setTimeout(function() {
	    		marker.setAnimation(null);	
	    	}, 1000)
	    	marker.setAnimation(google.Animation.BOUNCE);
	    })
		}
		//Populate markers infowindow with corresponding data
		function populateInfoWindow(marker, infowindow, map, restaurant) {
			if (infowindow.marker !== marker) {
				infowindow.marker = marker;
				infowindow.setContent(`<div class="info-window">
																<h2 tabindex="-1" id=${restaurant.id}>${restaurant.name}</h2>
																<p>Rating: ${restaurant.rating ? restaurant.rating : 'Unavailable'} Price: ${restaurant.price ? restaurant.price : 'Unavailable'}</p>
																<img alt=${restaurant.name} src=${restaurant.image_url}>
																<p>${restaurant.location.address1} ${restaurant.location.address2}, ${restaurant.location.city} ${restaurant.location.zip_code}</p>
																<p>${restaurant.display_phone}</p>
																<p class='info-window-attr'>Information courtesy of Yelp's API</p>
															</div>`)
				infowindow.open(map, marker);
				infowindow.addListener('closeclick', function(){
					document.getElementById('menu-burger').focus();
				})
			}
		}
  	this.setState({
  		markers: markers,
  		googleMap: google,
  	})
	}

	// Retrieve restaurant data from yelp API
	componentDidMount() {
		fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=mexican+food&location=roanoke+va', {
			headers: {
				Authorization: 'Bearer wbY30-AwuCYL_fcal_TlDsx3725sox4hMSMH_YwS8pFGpGTHs1g7dqD3tDTbVuMSkrXoupbKjRktLpgR_VvePtm1SQW-5x7zRIsvf4OD1zNWqLfEpEIKYP-LBx3eW3Yx'
			}
		}).then(response => response.json()).then(response => {
			this.setState({restaurants:response.businesses, selectedRestaurants:response.businesses})
		}).catch(err => alert('Failed to load information from Yelp'))
	}

  render() {
    return (
      <div className="App">
      	<FilterByRating onChange={this.setFilters}/>
      	<FilterByPrice onChange={this.setFilters}/>
      	<MenuBurger toggleNav={this.toggleNav} menuState={this.state.menuState}/>
      	<RestaurantList toggleNav={this.toggleNav} menuState={this.state.menuState} restaurants={this.state.selectedRestaurants} google={this.state.googleMap} markers={this.state.markers}/>
        <Map restaurants={this.state.selectedRestaurants} setMarkers={this.setMarkers}/>
      </div>
    );
  }
}

export default App;
