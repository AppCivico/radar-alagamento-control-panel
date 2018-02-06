import React from 'react';
import axios from 'axios';

import { validate } from '../../utils';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			validation: {
				status: false,
				errors: {},
			},
		};

		this.login = this.login.bind(this);
	}


	validade(e) {
		e.preventDefault();

		const data = {
			email: this.email.value,
			password: this.password.value,
		};

		const validation = validate(data);

		this.setState({ validation });

		if (!this.state.validation.status) {
			this.login(data);
		}
	}

	login(data) {
		axios({
			method: 'POST',
			url: 'https://dtupa.eokoe.com/login',
			headers: { 'Content-Type': 'application/json' },
			data,
		})
			.then((response) => {
				const apiKey = response.data.api_key;
				window.sessionStorage.setItem('apiKey', apiKey);

				// eslint-disable-next-line
				this.props.history.push('/alerts');
			}, () => {
				const validation = {
					status: true,
					errors: { login: 'E-mail ou senha inválidos. Tente novamente.' },
				};
				this.setState({ validation });
			});
	}

	render() {
		const { errors } = this.state.validation;
		return (
			<div>
				<div className="login-box">
					<div className="login-logo">
						<a href="../../index2.html">Logo</a>
					</div>
					<div className="login-box-body">
						<form onSubmit={e => this.validade(e)}>
							<div className={`form-group ${errors.email ? 'has-error' : ''}`}>
								<input type="email" className="form-control login-email" placeholder="email" ref={(input) => { this.email = input; }} />
								{errors.email &&
									<span className="help-block">{errors.email}</span>
								}
							</div>
							<div className={`form-group ${errors.password ? 'has-error' : ''}`}>
								<input type="password" className="form-control login-password" placeholder="password" ref={(input) => { this.password = input; }} />
								{errors.password &&
									<span className="help-block">{errors.password}</span>
								}
							</div>
							<div className="row">
								<div className="col-xs-12">
									<button className="btn btn-primary btn-block btn-flat" type="submit">Login</button>
									{errors.login &&
										<div className="form-group has-error">
											<span className="help-block">{errors.login}</span>
										</div>
									}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
