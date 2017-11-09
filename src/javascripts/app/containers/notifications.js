import React from 'react';
import Notification from '../components/notification';

class Notifications extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		};

		// This binding is necessary to make `this` work in the callback
		this.loadNotifications = this.loadNotifications.bind(this);
	}

	loadNotifications() {
		fetch('http://localhost:3030/notifications').then((response) => {
			return response.json();
		}).then((response) => {
			// set state
			this.setState({notifications: response});
		});
	}

	componentDidMount() {
		this.loadNotifications();
	}

	render() {
		const hasNotifications = this.state.notifications.length < 1;
		return (
			<div className="col-xs-12">
				<div className="box">
					<div className="box-header">
						<h3 className="box-title">Notificações</h3>

						<div className="box-tools">
							<div className="input-group input-group-sm notifications-search">
								<input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />

								<div className="input-group-btn">
									<button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
								</div>
							</div>
						</div>
					</div>
					<div className="box-body table-responsive no-padding">
						<table className="table table-hover">
							<tbody><tr>
								<th>ID</th>
								<th>Title</th>
								<th>Date</th>
								<th>Status</th>
								<th>Descrição</th>
								<th></th>
							</tr>
							{hasNotifications ? (
				        <tr>
									<td colspan="6">
										<div className="callout callout-info">
			                <p>Nenhuma notificação localizada</p>
			              </div>
									</td>
								</tr>
				      ) : (
				        this.state.notifications.map((notification) => {
									return <Notification key={notification.id} notification={notification}></Notification>
								})
				      )}
						</tbody></table>
					</div>
					<div className="box-footer clearfix">
						<ul className="pagination pagination-sm no-margin pull-right">
							<li><a href="0">«</a></li>
							<li><a href="1">1</a></li>
							<li><a href="2">2</a></li>
							<li><a href="3">3</a></li>
							<li><a href="4">»</a></li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Notifications;
