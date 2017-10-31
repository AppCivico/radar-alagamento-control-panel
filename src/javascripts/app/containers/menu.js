import React from 'react';
import {
	BrowserRouter as Router,
	Link }
	from 'react-router-dom'

class Menu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					<ul className="sidebar-menu" data-widget="tree">
						<Router>
							<li className="treeview">
								<Link to="/notifications">
									<i className="fa fa-hand-o-right"></i>
									<span>Notificações</span>
								</Link>
							</li>
						</Router>
					</ul>
				</section>
			</aside>
		)
	}
}

export default Menu;
