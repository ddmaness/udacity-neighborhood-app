import React from 'react';
import './RestaurantList.css';

// Generate nav bar populated by list of restaurants
function RestaurantList(props) {
	const list =  props.restaurants.map(function(elem, i) {
		return (
			<li key={elem.id}><button 
				onClick={()=>{
					// Close navbar in mobile if restaurant is selected
					props.toggleNav();
					// Open appropriate infowindow on map based on restaurant clicked
					new props.google.event.trigger(props.markers[i], 'click');
					// focus on head of infowindow so users will not have to navigate through entire menu to
					// reach the infowindow
					setTimeout(function(){
						document.getElementById(elem.id).focus();
					},10)
				}
			}>{elem.name}<span className="address"><br/>{elem.location.address1}</span></button></li>
		)
	})
  return (
  	<nav className={props.menuState}>
    	<ul className="list">{list}</ul>
    </nav>
  );
}

export default RestaurantList;