import React from 'react';

class Alert extends React.Component {
	render() {
		return (
			<div className={`modal fade in ${this.props.isOpen ? 'open' : ''}`} id="alert">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Cancelar">
								<span aria-hidden="true">×</span>
							</button>
							<h4 className="modal-title">Criar alerta</h4>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>wefwef</label>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
							<button type="button" className="btn btn-primary">Enviar</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Alert;
