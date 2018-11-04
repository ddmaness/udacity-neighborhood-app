import React from 'react';

function RestaurantList(props) {
	const list =  props.restaurants.map(function(elem) {
		return (
			<li key={elem.id}><a>{elem.name}</a></li>
		)
	})
	console.log(props)
  return (
    <ul>{list}</ul>
  );
}

export default RestaurantList;