import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: false};

		// This binding is necessary to make `this` work in the callback
		this.dropdownClick = this.dropdownClick.bind(this);
	}

	dropdownClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	sidebarToggle() {
		document.body.classList.toggle('sidebar-collapse')
	}

	render() {
		return (
			<header className="main-header">
				<a href="/" className="logo">
					<span className="logo-mini">RdA</span>
					<span className="logo-lg">Radar do <strong>Alagamento</strong></span>
				</a>
				<nav className="navbar navbar-static-top">{
						// eslint-disable-next-line jsx-a11y/href-no-hash
						}<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button" onClick={this.sidebarToggle}>
						<span className="sr-only">toggle</span>
					</a>

					<div className="navbar-custom-menu">
						<ul className="nav navbar-nav">
							<li className={`dropdown user user-menu ${this.state.isToggleOn ? 'open' : ''}`} onClick={this.dropdownClick}>{
								// eslint-disable-next-line jsx-a11y/href-no-hash
								}<a href="#" className="dropdown-toggle" data-toggle="dropdown">

									<span className="hidden-xs">User</span>
								</a>
								<ul className="dropdown-menu">
									<li className="user-header">

										<p>
											User
											<small>E-mail</small>
										</p>
									</li>
									<li className="user-footer">
										<div className="pull-right">{
											// eslint-disable-next-line jsx-a11y/href-no-hash
											}<a href="#" className="btn btn-default btn-flat">Sair</a>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Header;
