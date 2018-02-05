import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { validate } from '../../utils';

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
			button: true,
			msg: '',
			districts: [],
			selectedDistricts: [],
		};

		this.sendNotification = this.sendNotification.bind(this);
		this.toggleButton = this.toggleButton.bind(this);
		this.getDistricts = this.getDistricts.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getDistricts();
	}


	getDistricts() {
		axios.get('https://dtupa.eokoe.com/zone')
			.then((response) => {
				const zones = response.data.results;
				let districts = [];
				// eslint-disable-next-line array-callback-return
				zones.map((item) =>	{ districts = [...districts, ...item.districts]; });
				this.setState({ districts });
			})
			.catch(() => this.showError('Ocorreu um ao carregar os distritos, tente novamente'));
	}

	sendNotification(e) {
		e.preventDefault();

		this.toggleButton(false);

		const data = {
			sensor_sample_id: this.props.alert.id,
			description: this.description.value,
			level: this.level.value,
			districts: this.state.selectedDistricts,
		};

		const validation = validate(data);
		this.setState({ validation });

		if (validation.status) {
			const apiKey = window.sessionStorage.getItem('apiKey');
			axios({
				method: 'POST',
				url: `https://dtupa.eokoe.com/admin/alert?api_key=${apiKey}`,
				headers: { 'Content-Type': 'application/json' },
				data,
			})
				.then((response) => {
					const msg = `Notificação enviada com sucesso, ${response.data.pushed_to_users} usuários notificados`;
					this.setState({ msg });

					this.newNotification.reset();
					this.toggleButton(true);
				}, (err) => {
					this.setState({ msg: err });
					this.toggleButton(true);
				});
		} else {
			this.toggleButton(true);
		}
	}

	sourceName(source) {
		if (source) {
			return source.name;
		}

		return '';
	}

	toggleButton(state) {
		const button = state;
		this.setState({ button });
	}

	handleChange(e) {
		const selectedDistricts = [...e.target.options].filter(o => o.selected).map(o => o.value);
		this.setState({ selectedDistricts });
	}

	renderOptions(item) {
		return <option key={item} value={item}>{this.state.levels[item]}</option>;
	}

	render() {
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
									<h4>Notificação:</h4>
									<div className={`form-group ${this.state.validation.errors.description ? 'has-error' : ''}`}>
										<label htmlFor="description">Descrição
											<input
												type="text"
												name="description"
												ref={(input) => { this.description = input; }}
												className="form-control"
												placeholder="Exemplo: Transbordamento de córrego"
											/>
										</label>
										<span className="help-block">{this.state.validation.errors.description}</span>
									</div>
									<div className={`form-group ${this.state.validation.errors.level ? 'has-error' : ''}`}>
										<label htmlFor="level">Nível
											<select name="level" ref={(input) => { this.level = input; }} className="form-control">
												{Object.keys(this.state.levels).map(item => this.renderOptions(item))}
											</select>
										</label>
										<span className="help-block">{this.state.validation.errors.level}</span>
									</div>
									<div className={`form-group ${this.state.validation.errors.districts ? 'has-error' : ''}`}>
										<label htmlFor="districts">Distrito
											<select name="districts" onChange={this.handleChange} className="form-control" multiple>
												{this.state.districts.map(item => (
													<option key={`district-${item.id}`} value={item.id}>{item.name}</option>
												))}
											</select>
										</label>
										<span className="help-block">{this.state.validation.errors.districts}</span>
									</div>
									{this.state.msg && <hr />}
									<p>{this.state.msg}</p>
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
								<button type="submit" className="btn btn-primary" disabled={!this.state.button}>
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
