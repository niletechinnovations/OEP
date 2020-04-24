/**
  * <HeaderBar />
  */

import React from 'react';

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div className="toolbar-header">
        <span className="label label-default">{this.props.data.text}</span>
        <div className="toolbar-header-buttons">
          { this.props.data.element !== 'LineBreak' &&
            <div className="btn is-isolated btn-school btn-edit" onClick={this.props.editModeOn.bind(this.props.parent, this.props.data)} title="Edit"><i className="is-isolated fa fa-pencil-square-o"></i></div>
          }
          <div className="btn is-isolated btn-school btn-copy" onClick={this.props.copyModeOn.bind(this.props.parent, this.props.data)} title="Copy"><i className="is-isolated fa fa-copy"></i></div>
          <div className="btn is-isolated btn-school btn-delete" onClick={this.props.onDestroy.bind(this, this.props.data)} title="Delete"><i className="is-isolated fa fa-trash-o"></i></div>
        </div>
      </div>
    );
  }
}
