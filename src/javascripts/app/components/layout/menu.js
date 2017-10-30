import React from 'react';

class Menu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					<ul className="sidebar-menu" data-widget="tree">
						<li className="treeview">{
				        // eslint-disable-next-line jsx-a11y/href-no-hash
				      }<a href="#">
								<i className="fa fa-pie-chart"></i>
								<span>texto</span>
								<span className="pull-right-container">
									<i className="fa fa-angle-left pull-right"></i>
								</span>
							</a>
							<ul className="treeview-menu">
								<li><a href="/categories"><i className="fa fa-circle-o"></i>texto</a></li>
								<li><a href="/results"><i className="fa fa-circle-o"></i>texto</a></li>
							</ul>
						</li>
						<li className="treeview">
							<a href="/complaints/0">
								<i className="fa fa-hand-o-right"></i>
								<span>texto</span>
							</a>
						</li>
						<li className="treeview">
							<a href="/complaints/1">
								<i className="fa fa-hand-grab-o"></i>
								<span>texto</span>
							</a>
						</li>
						<li className="treeview">
							<a href="/notifications">
								<i className="fa fa-bell"></i>
								<span>texto</span>
							</a>
						</li>
					</ul>
				</section>
			</aside>
		)
	}
}

export default Menu;
