import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../utils';

class Notification extends React.Component {
	constructor() {
		super();

		this.state = {
			notification: {},
		};
	}

	sendNotification() {
		console.log(this.state.notification);
	}

	render() {
		const { alert } = this.props;
		return (
			<div className={`modal fade in ${this.props.isOpen ? 'open' : ''}`} id="notification">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								aria-label="Cancelar"
								onClick={() => this.props.toggleModal(false)}
							>
								<span aria-hidden="true">×</span>
							</button>
							<h4 className="modal-title">Criar notificação</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								{alert.id}
								<br />
								{alert.name}
								<br />
								{formatDate(alert.created_at)}
								<br />
								<br />
								{alert.type}
								<br />
								{alert.description}
								<br />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-default pull-left"
								onClick={() => this.props.toggleModal(false)}
							>
								Cancelar
							</button>
							<button type="button" className="btn btn-primary">
								Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Notification.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
	alert: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	])).isRequired,
};

export default Notification;
