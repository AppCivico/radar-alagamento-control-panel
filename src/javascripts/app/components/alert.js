import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../utils';

class Alert extends React.Component {
	constructor() {
		super();
		this.createAlert = this.createAlert.bind(this);
	}

	createAlert(e) {
		e.preventDefault();
		this.props.changeSelectedAlert(this.props.alert);
		this.props.toggleModal(true);
	}

	render() {
		const alert = this.props.alert;

		return (
			<tr className="alert">
				<td>{alert.id}</td>
				<td>{alert.name}</td>
				<td>{formatDate(alert.created_at)}</td>
				<td>{alert.source.name}</td>
				<td>{alert.type}</td>
				<td>{alert.description}</td>
				<td>
					<div className="btn-group pull-right">
						<button type="button" className="btn btn-danger" onClick={e => this.createAlert(e)}>
							Criar notificação
						</button>
						<button type="button" className="btn btn-info">
							Ignorar
						</button>
					</div>
				</td>
			</tr>
		);
	}
}

Alert.propTypes = {
	changeSelectedAlert: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
	alert: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.objectOf(PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		])),
	])).isRequired,
};

export default Alert;
