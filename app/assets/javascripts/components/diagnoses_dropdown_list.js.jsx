window.DiagnosesDropdownList = React.createClass({
  render: function () {
    return(
      <div className="diagnoses-dropdown-list">
        {
          this.props.diagnoses.map(function(diagnosis){
            return(
              <DiagnosesDropdownListItem handleDiagnosisClick={this.props.handleDiagnosisClick}
                                         diagnosis={diagnosis}
                                         key={diagnosis[1]}/>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
