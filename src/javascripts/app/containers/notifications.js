import React from 'react';
import Notification from '../components/notification';
import SearchBox from '../components/searchBox';
import Pagination from '../components/pagination';

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
							<SearchBox></SearchBox>
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
									<td colSpan="6">
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
						<Pagination></Pagination>
					</div>
				</div>
			</div>
		)
	}
}

export default Notifications;
