import React from 'react';

class Notification extends React.Component {
	render() {
		return (
			<div className={`modal fade in ${this.props.isOpen ? 'open' : ''}`} id="alert">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" aria-label="Cancelar" onClick={() => this.props.toggleModal(false)}>
								<span aria-hidden="true">×</span>
							</button>
							<h4 className="modal-title">Criar notificação</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>wefwef</label>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default pull-left" onClick={() => this.props.toggleModal(false)}>Cancelar</button>
							<button type="button" className="btn btn-primary">Enviar</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Notification;
