import React from 'react';

function FilterByRating(props) {
  return (
    <select onChange={function(event){props.onChange(event, 'ratingFilter')}}>
    	<option value="0">Any</option>
    	<option value="4">Better</option>
    	<option value="4.5">Best</option>
    </select>
  );
}

export default FilterByRating;