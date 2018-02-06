import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './containers/header';
import Menu from './containers/menu';
import Alerts from './containers/alerts';
import Login from './containers/login';
import NotFound from './containers/notFound';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logged: false,
		};
	}

	componentWillMount() {
		this.getCredentials();
	}

	getCredentials() {
		const apiKey = sessionStorage.getItem('apiKey');

		// check if api-key exists, if negative, send user to login page
		if (apiKey) {
			this.setState({ logged: true });
		}
	}

	render() {
		return (
			<Router>
				<div className="wrapper">
					{this.state.logged &&
						<Header />
					}
					{this.state.logged &&
						<Menu />
					}
					<div className={`content-wrapper ${!this.state.logged ? 'login' : ''}`}>
						<div className="content">
							<div className="row">
								<Switch>
									<Route exact path="/" component={Login} />
									<Route path="/alerts" component={Alerts} />
									<Route component={NotFound} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
