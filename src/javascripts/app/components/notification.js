import React from 'react';

import { formatDate } from '../../utils';

const Notification = (props) => {
	const alert = props.alert;
	return (
		<div
			className={`modal fade in ${props.isOpen ? 'open' : ''}`}
			id="alert"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button
							type="button"
							className="close"
							aria-label="Cancelar"
							onClick={() => props.toggleModal(false)}
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
							{alert.source_id}
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
							onClick={() => props.toggleModal(false)}
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
};

export default Notification;
