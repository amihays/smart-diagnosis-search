window.DiagnosesDropdownListItem = React.createClass({
  render: function () {
    return(
      <div onClick={this.props.handleDiagnosisClick}
           className="diagnoses-dropdown-list-item">{ this.props.diagnosis[0] }</div>
    )
  }
})
