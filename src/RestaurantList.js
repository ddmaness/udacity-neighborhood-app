import React from 'react';

function RestaurantList(props) {
	const list =  props.restaurants.map(function(elem, i) {
		return (
			<li><a href='#' onClick={()=>new props.google.event.trigger(props.markers[i], 'click')} key={elem.id}>{elem.name}</a></li>
		)
	})
	console.log(props.google ? props.google : 'test')
  return (
    <ul>{list}</ul>
  );
}

export default RestaurantList;