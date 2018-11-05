import React from 'react';
import './RestaurantList.css';

function RestaurantList(props) {
	const list =  props.restaurants.map(function(elem, i) {
		return (
			<li key={elem.id}><button onClick={()=>{
				props.toggleMenu();
				new props.google.event.trigger(props.markers[i], 'click');
				}
			}>{elem.name}</button></li>
		)
	})
  return (
  	<nav className={props.menuState}>
    	<ul className="list">{list}</ul>
    </nav>
  );
}

export default RestaurantList;