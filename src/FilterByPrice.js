import React from 'react';
import './select.css';
import './FilterByPrice.css'

function FilterByPrice(props) {
  return (
    <select className="filter-by-price" onChange={function(event){props.onChange(event, 'priceFilter')}}>
    	<option value="$$$">Any Price</option>
    	<option value="$$">Cheaper</option>
    	<option value="$">Cheapest</option>
    </select>
  );
}

export default FilterByPrice;