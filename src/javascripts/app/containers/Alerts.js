import React from 'react';
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
		};

		// This binding is necessary to make `this` work in the callback
		this.loadAlerts = this.loadAlerts.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.changeSelectedAlert = this.changeSelectedAlert.bind(this);
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
		fetch('https://dtupa.eokoe.com/sensor?api_key=f17a9b9d-221a-47c0-9628-07b3a0fd1a59')
			.then(response => response.json())
			.then((response) => {
				// set state
				this.setState({ alerts: response.results });
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
