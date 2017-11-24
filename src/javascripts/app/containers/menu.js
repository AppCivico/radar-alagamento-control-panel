import React from 'react';
import { Link } from 'react-router-dom'

class Menu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					<ul className="sidebar-menu" data-widget="tree">
							<li className="treeview">
								<Link to="/alerts">
									<i className="fa fa-hand-o-right"></i>
									<span>Alertas</span>
								</Link>
							</li>
					</ul>
				</section>
			</aside>
		)
	}
}

export default Menu;
