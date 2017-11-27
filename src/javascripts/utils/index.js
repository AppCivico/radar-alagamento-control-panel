const formatDate = (date) => {
	if (date) {
		return date
			.split(' ')[0]
			.split('-')
			.reverse()
			.join('/');
	}

	return date;
};

// Pass an object as paramater to validate it's fields
const validate = (data) => {
	const validation = {
		status: false,
		errors: {},
	};

	// eslint-disable-next-line array-callback-return
	Object.keys(data).map((item) => {
		if (data[item] === '') {
			validation.errors[item] = 'Campo obrigatório';
		}
	});

	if (Object.keys(validation.errors).length < 1) {
		validation.status = true;
	}

	return validation;
};

export { formatDate, validate };
