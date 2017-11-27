import React from 'react';
import PropTypes from 'prop-types';

import { formatDate, validate } from '../../utils';

class Notification extends React.Component {
	constructor() {
		super();

		this.state = {
			levels: {
				attention: 'Atenção',
				alert: 'Alerta',
				emergency: 'Emergência',
				overflow: 'Enchente',
			},
			validation: {
				status: false,
				errors: {},
			},
		};

		this.sendNotification = this.sendNotification.bind(this);
	}

	sourceName(source) {
		if (source) {
			return source.name;
		}

		return '';
	}

	sendNotification(e) {
		e.preventDefault();

		const body = {
			sensor_sample_id: this.props.alert.id,
			description: this.description.value,
			level: this.level.value,
		};

		const validation = validate(body);
		this.setState({ validation });

		if (validation.status) {
			fetch(
				'https://dtupa.eokoe.com/admin/alert?api_key=f17a9b9d-221a-47c0-9628-07b3a0fd1a59',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				},
			).then(() => {
				this.newNotification.reset();
			}).catch((err) => {
				console.error(err);
			});
		}
	}

	renderOptions(item) {
		return <option key={item} value={item}>{this.state.levels[item]}</option>;
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
							<h4 className="modal-title">
								<strong>Criar notificação</strong>
							</h4>
						</div>
						<form
							onSubmit={e => this.sendNotification(e)}
							ref={(input) => { this.newNotification = input; }}
						>
							<div className="modal-body">
								<div className="form-group">
									<h4>Dados do alerta selecionado:</h4>
									<p>
										<strong>ID: </strong>
										{alert.id}
										<br />
										<strong>Título: </strong>
										{alert.name}
										<br />
										<strong>Data: </strong>
										{formatDate(alert.created_at)}
										<br />
										<strong>Fonte: </strong>
										{this.sourceName(alert.source)}
										<br />
										<strong>Tipo: </strong>
										{alert.type}
										<br />
										<strong>Descrição: </strong>
										{alert.description}
									</p>
									<hr />
									<h4>Notificação:</h4>
									<div className={`form-group ${this.state.validation.errors.description ? 'has-error' : ''}`}>
										<label htmlFor="description">Descrição</label>
										<input
											type="text"
											name="description"
											ref={(input) => { this.description = input; }}
											className="form-control"
											placeholder="Exemplo: Transbordamento de córrego"
										/>
										<span className="help-block">{this.state.validation.errors.description}</span>
									</div>
									<div className={`form-group ${this.state.validation.errors.level ? 'has-error' : ''}`}>
										<label htmlFor="level">Select</label>
										<select name="level" ref={(input) => { this.level = input; }} className="form-control">
											{Object.keys(this.state.levels).map(item => this.renderOptions(item))}
										</select>
										<span className="help-block">{this.state.validation.errors.level}</span>
									</div>
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
								<button type="submit" className="btn btn-primary">
									Enviar
								</button>
							</div>
						</form>
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
