import React from "react";

class Notification extends React.Component {
  constructor() {
    super();
    this.createNotification = this.createNotification.bind(this);
  }

  createNotification() {
    this.props.toggleModal(true);
  }

  formatDate(date) {
    return date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("/");
  }

  render() {
    const notification = this.props.notification;

    return (
      <tr className="notification">
        <td>{notification.id}</td>
        <td>{notification.name}</td>
        <td>{this.formatDate(notification.created_at)}</td>
        <td>{notification.source_id}</td>
        <td>{notification.type}</td>
        <td>{notification.description}</td>
        <td>
          <div className="btn-group pull-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.createNotification()}
            >
              Criar notificação
            </button>
            <button type="button" className="btn btn-info">
              Ignorar
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Notification;
