import React from 'react';

class Pagination extends React.Component {
	render() {
		return (
			<ul className="pagination pagination-sm no-margin pull-right">
				<li><a href="0">«</a></li>
				<li><a href="1">1</a></li>
				<li><a href="2">2</a></li>
				<li><a href="3">3</a></li>
				<li><a href="4">»</a></li>
			</ul>
		)
	}
}

export default Pagination;
