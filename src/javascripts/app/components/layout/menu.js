import React from 'react';

class Menu extends React.Component {
	render() {
		return (
			<aside class="main-sidebar">
				<section class="sidebar">
					<ul class="sidebar-menu" data-widget="tree">
						<li class="treeview">{
				        // eslint-disable-next-line jsx-a11y/href-no-hash
				      }<a href="#">
								<i class="fa fa-pie-chart"></i>
								<span>texto</span>
								<span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
							</a>
							<ul class="treeview-menu">
								<li><a href="/categories"><i class="fa fa-circle-o"></i>texto</a></li>
								<li><a href="/results"><i class="fa fa-circle-o"></i>texto</a></li>
							</ul>
						</li>
						<li class="treeview">
							<a href="/complaints/0">
								<i class="fa fa-hand-o-right"></i>
								<span>texto</span>
							</a>
						</li>
						<li class="treeview">
							<a href="/complaints/1">
								<i class="fa fa-hand-grab-o"></i>
								<span>texto</span>
							</a>
						</li>
						<li class="treeview">
							<a href="/notifications">
								<i class="fa fa-bell"></i>
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
