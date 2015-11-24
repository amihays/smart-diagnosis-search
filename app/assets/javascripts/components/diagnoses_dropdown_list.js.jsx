window.DiagnosesDropdownList = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnoses.map(function(diagnosis){
            return(
              <DiagnosesDropdownListItem diagnosisClickHandler={this.props.diagnosisClickHandler}
                                         diagnosis={diagnosis}
                                         key={diagnosis[1]}/>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
