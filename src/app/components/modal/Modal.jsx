import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {

  componentDidMount () {
    this._container = this.props.modalId && document.getElementById(this.props.modalId);

    if (!this._container) {
      this._container = document.createElement('div');
      this._container.id = this.props.modalId;
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

