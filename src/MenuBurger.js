import React from 'react';
import './MenuBurger.css';

// Create menu burger to open and close navbar for mobile devices
function MenuBurger(props) {
  return (
  //generate aria state based on app state
  <button id="menu-burger" aria-haspopup="true" aria-expanded={props.menuState === "menu-hide" ? "false" : "true"} 
  onClick={()=> {
  	const nav = document.getElementsByTagName('nav')[0] 
  	// prevent user from attempting to open nav bar with no items present
  	if(nav.firstChild.firstChild){
  		props.toggleNav();
  	}
  }} className={props.menuState}>
		<div></div>
		<div></div>
		<div></div>
	</button>
  );
}

export default MenuBurger;