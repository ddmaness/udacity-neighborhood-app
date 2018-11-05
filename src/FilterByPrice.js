import React from 'react';
import './select.css';
import './FilterByPrice.css';

// Create select menu for users to filter by price
function FilterByPrice(props) {
  return (
    <select className="filter-by-price" aria-label="prices" onChange={function(event){props.onChange(event, 'priceFilter')}}>
    	<option value="$$$">Any Price</option>
    	<option value="$$">Cheaper</option>
    	<option value="$">Cheapest</option>
    </select>
  );
}

export default FilterByPrice;