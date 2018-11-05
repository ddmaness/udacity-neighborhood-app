import React from 'react';
import './select.css';
import './FilterByRating.css';

function FilterByRating(props) {
  return (
    <select className="filter-by-rating" onChange={function(event){props.onChange(event, 'ratingFilter')}}>
    	<option value="0">Any Quality</option>
    	<option value="4">Better</option>
    	<option value="4.5">Best</option>
    </select>
  );
}

export default FilterByRating;