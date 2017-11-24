import React from "react";

class Alert extends React.Component {
  constructor() {
    super();
    this.createAlert = this.createAlert.bind(this);
  }

  createAlert() {
    this.props.toggleModal(true);
  }

  formatDate(date) {
    if (date)
      return date
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("/");
  }

  render() {
    const alert = this.props.alert;

    return (
      <tr className="alert">
        <td>{alert.id}</td>
        <td>{alert.name}</td>
        <td>{this.formatDate(alert.created_at)}</td>
        <td>{alert.source_id}</td>
        <td>{alert.type}</td>
        <td>{alert.description}</td>
        <td>
          <div className="btn-group pull-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.createAlert()}
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

export default Alert;
