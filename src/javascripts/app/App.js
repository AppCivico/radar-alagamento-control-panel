import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch }
	from 'react-router-dom';

import Header from './containers/header';
import Menu from './containers/menu';
import Notifications from './containers/notifications';
import NotFound from './containers/notFound';

class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header></Header>
				<Menu></Menu>
				<div className="content-wrapper">
					<div className="content">
						<div className="row">
							 <Router>
							 	<Switch>
									<Route path="/notifications" component={Notifications}/>
									<Route component={NotFound}/>
								</Switch>
							</Router>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
