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
			// set state
			this.setState({notifications: response});
		});
  }

  componentDidMount() {
  	this.loadNotifications();
  }

	render() {
		return (
			<div className="content">
				<div className="row">
					<div className="col-xs-12">
	          <div className="box">
	            <div className="box-header">
	              <h3 className="box-title">Notificações</h3>

	              <div className="box-tools">
	                <div className="input-group input-group-sm notifications-search">
	                  <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />

	                  <div className="input-group-btn">
	                    <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <div className="box-body table-responsive no-padding">
	              <table className="table table-hover">
	                <tbody><tr>
	                  <th>ID</th>
	                  <th>User</th>
	                  <th>Date</th>
	                  <th>Status</th>
	                  <th>Reason</th>
	                </tr>
	                <tr>
	                  <td>183</td>
	                  <td>John Doe</td>
	                  <td>11-7-2014</td>
	                  <td><span className="label label-success">Approved</span></td>
	                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
	                </tr>
	                <tr>
	                  <td>219</td>
	                  <td>Alexander Pierce</td>
	                  <td>11-7-2014</td>
	                  <td><span className="label label-warning">Pending</span></td>
	                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
	                </tr>
	                <tr>
	                  <td>657</td>
	                  <td>Bob Doe</td>
	                  <td>11-7-2014</td>
	                  <td><span className="label label-primary">Approved</span></td>
	                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
	                </tr>
	                <tr>
	                  <td>175</td>
	                  <td>Mike Doe</td>
	                  <td>11-7-2014</td>
	                  <td><span className="label label-danger">Denied</span></td>
	                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
	                </tr>
	              </tbody></table>
	            </div>
	            <div className="box-footer clearfix">
	              <ul className="pagination pagination-sm no-margin pull-right">
	                <li><a href="0">«</a></li>
	                <li><a href="1">1</a></li>
	                <li><a href="2">2</a></li>
	                <li><a href="3">3</a></li>
	                <li><a href="4">»</a></li>
	              </ul>
	            </div>
	          </div>
	        </div>
				</div>
			</div>
		)
	}
}

export default Notifications;
