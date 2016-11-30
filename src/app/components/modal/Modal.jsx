import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {

  componentDidMount () {
    this._container = this.props.containerId && document.getElementById(this.props.containerId);

    if (!this._container) {
      this._container = document.createElement('div');
      this._container.id = this.props.containerId;
      document.body.appendChild(this._container);
    }

    this.componentDidUpdate();
  }

  componentWillUnmount () {
    this.dismiss();
  }

  dismiss () {
    document.body.removeChild(this._container);
    ReactDOM.unmountComponentAtNode(this._container);
  }

  componentDidUpdate() {
    ReactDOM.render(
      <div>
        <div id="modalHead">
          <div>{this.props.title}</div>
          <button onClick={this.dismiss.bind(this)}>close</button>
        </div>
        <div id="modalBody">
          {this.props.children}
        </div>
      </div>,
      this._container
    );
  }

  render () {
    return null;
  }
}

Modal.propTypes = {
  title: React.PropTypes.string,
  containerId: React.PropTypes.string.isRequired
};

