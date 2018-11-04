import React from 'react';

function FilterByPrice(props) {
  return (
    <select onChange={function(event){props.onChange(event, 'priceFilter')}}>
    	<option value="$$$">Any</option>
    	<option value="$$">Cheaper</option>
    	<option value="$">Cheapest</option>
    </select>
  );
}

export default FilterByPrice;