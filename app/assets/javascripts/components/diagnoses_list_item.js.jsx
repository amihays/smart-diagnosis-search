window.DiagnosesListItem = React.createClass({
  render: function () {
    return(
      <div onClick={this.props.handleDiagnosisClick}
           className="diagnoses-list-item">{ this.props.diagnosis[0] }</div>
    );
  }
})
