import React from 'react';
import userDefault from '../../../../images/user-default.png';

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

	render() {
		return (
			<header className="main-header">
				<a href="/" className="logo">
					<span className="logo-mini">RdA</span>
					<span className="logo-lg">Radar do <strong>Alagamento</strong></span>
				</a>
				<nav className="navbar navbar-static-top">{
		        // eslint-disable-next-line jsx-a11y/href-no-hash
		        }<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
						<span className="sr-only">toggle</span>
					</a>

					<div className="navbar-custom-menu">
						<ul className="nav navbar-nav">
							<li className={`dropdown user user-menu ${this.state.isToggleOn ? 'open' : ''}`} onClick={this.dropdownClick}>{
				        // eslint-disable-next-line jsx-a11y/href-no-hash
				        }<a href="#" className="dropdown-toggle" data-toggle="dropdown">
									<img src={userDefault} className="user-image" alt="User Avatar" />
									<span className="hidden-xs">User</span>
								</a>
								<ul className="dropdown-menu">
									<li className="user-header">
										<img src={userDefault} className="img-circle" alt="User Avatar" />
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
