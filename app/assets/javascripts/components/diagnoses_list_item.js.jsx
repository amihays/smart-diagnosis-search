window.DiagnosesListItem = React.createClass({
  render: function () {
    return(
      <div onClick={this.props.diagnosisClickHandler}
           className="diagnoses-dropdown-list-item">{ this.props.diagnosis[1] }</div>
    );
  }
})
