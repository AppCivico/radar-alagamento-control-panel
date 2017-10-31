import React from 'react';

class Notification extends React.Component {

	render() {
		const notification = this.props.notification;

		return (
			<tr>
				<td>{notification.id}</td>
				<td>{notification.title}</td>
				<td>{notification.date}</td>
				<td><span className={`label label-${notification.level}`}>{notification.level}</span></td>
				<td>{notification.description}</td>
			</tr>
		)
	}
}

export default Notification;
