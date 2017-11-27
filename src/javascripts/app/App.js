import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch }
	from 'react-router-dom';

import Header from './containers/header';
import Menu from './containers/menu';
import Alerts from './containers/alerts';
import NotFound from './containers/notFound';

const App = () => (
	<Router>
		<div className="wrapper">
			<Header />
			<Menu />
			<div className="content-wrapper">
				<div className="content">
					<div className="row">
						<Switch>
							<Route path="/alerts" component={Alerts} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</div>
		</div>
	</Router>
);

export default App;
