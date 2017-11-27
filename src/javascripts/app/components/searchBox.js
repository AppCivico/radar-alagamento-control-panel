import React from 'react';

const SearchBox = () => (
	<div className="input-group input-group-sm notifications-search">
		<input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />

		<div className="input-group-btn">
			<button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
		</div>
	</div>
);

export default SearchBox;
