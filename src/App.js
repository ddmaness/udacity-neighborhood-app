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
			priceFilter: '$',
			ratingFilter: 0,
			restaurants: [],
			selectedRestaurants: [],
		}
		this.setFilters = this.setFilters.bind(this);
		this.filterList = this.filterList.bind(this);
	}

	setFilters(event, property) {
		this.setState({
			[property]: event.target.value
		},this.filterList)
	}

	filterList() {
		const price = this.state.priceFilter;
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
			selectedRestaurants: filteredList
		})
		console.log(this.state);
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
      	<RestaurantList restaurants={this.state.selectedRestaurants}/>
        <Map restaurants={this.state.selectedRestaurants}/>
      </div>
    );
  }
}

export default App;
