import React from 'react';

class Notifications extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	notifications: [],
    };

    // This binding is necessary to make `this` work in the callback
    this.loadNotifications = this.loadNotifications.bind(this);
  }

	loadNotifications() {
		fetch('http://localhost:3030/notifications').then((response) => {
		  return response.json();
		}).then((response) => {
		  this.setState({
		  	notifications: response.data
		  });
		});
  }

  componentDidMount() {
  	this.loadNotifications();
  }

	render() {
		return (
			<div className="row">
				<h2>Notifications</h2>
			</div>
		)
	}
}

export default Notifications;
