import React from 'react';
import axios from 'axios';

import Notification from '../components/notification';
import SearchBox from '../components/searchBox';
import Pagination from '../components/pagination';
import Alert from '../components/alert';

class Alerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alerts: [],
			modal: false,
			selectedAlert: {},
			apiKey: 'b1a8674a-aa98-45b1-9457-c2722bfb74cc',
		};

		// This binding is necessary to make `this` work in the callback
		this.loadAlerts = this.loadAlerts.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.changeSelectedAlert = this.changeSelectedAlert.bind(this);
	}

	componentWillMount() {
		const data = {
			email: 'email@email.com',
			password: '123segredo$$',
		};

		axios({
			method: 'POST',
			url: 'https://dtupa.eokoe.com/login',
			headers: { 'Content-Type': 'application/json' },
			data,
		})
			.then((response) => {
				const apiKey = response.data.api_key;
				this.setState({ apiKey });
				window.sessionStorage.setItem('apiKey', apiKey);
			}, (err) => {
				console.error(err);
			});
	}

	componentDidMount() {
		this.loadAlerts();
	}

	toggleModal(e) {
		this.setState({ modal: e });
	}

	changeSelectedAlert(alert) {
		this.setState({ selectedAlert: alert });
	}

	loadAlerts() {
		axios
			.get(`https://dtupa.eokoe.com/sensor?api_key=${this.state.apiKey}`)
			.then((response) => {
				this.setState({ alerts: response.data.results });
			}, (err) => {
				console.error(err);
			});
	}

	render() {
		const hasAlerts = this.state.alerts.length < 1;
		return (
			<div className="col-xs-12">
				<div className="box">
					<div className="box-header">
						<h3 className="box-title">Alertas</h3>

						<div className="box-tools">
							<SearchBox />
						</div>
					</div>
					<div className="box-body table-responsive no-padding">
						<table className="table table-hover">
							<tbody>
								<tr>
									<th>ID</th>
									<th>Title</th>
									<th>Date</th>
									<th>Source</th>
									<th>Type</th>
									<th>Descrição</th>
									<th />
								</tr>
								{hasAlerts ? (
									<tr>
										<td colSpan="6">
											<div className="callout callout-info">
												<p>Nenhum alerta localizado</p>
											</div>
										</td>
									</tr>
								) : (
									this.state.alerts.map(alert => (
										<Alert
											key={alert.id}
											alert={alert}
											toggleModal={this.toggleModal}
											changeSelectedAlert={this.changeSelectedAlert}
										/>
									))
								)}
							</tbody>
						</table>
					</div>
					<div className="box-footer clearfix">
						<Pagination />
					</div>
				</div>
				<Notification
					isOpen={this.state.modal}
					toggleModal={this.toggleModal}
					alert={this.state.selectedAlert}
				/>
			</div>
		);
	}
}

export default Alerts;
