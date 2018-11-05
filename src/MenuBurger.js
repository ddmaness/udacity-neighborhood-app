import React from 'react';
import './MenuBurger.css'

function MenuBurger(props) {
  return (
  <div onClick={props.toggleMenu} className={`menu-burger ${props.menuState}`} >
		<div></div>
		<div></div>
		<div></div>
	</div>
  );
}

export default MenuBurger;