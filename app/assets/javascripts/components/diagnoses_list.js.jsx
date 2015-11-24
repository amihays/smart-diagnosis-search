window.DiagnosesList = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnosesList.map(function(diagnosis){
            return(
              <DiagnosesListItem handleDiagnosisClick={this.props.handleDiagnosisClick}
                                 diagnosis={diagnosis}
                                 key={diagnosis[1]}/>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
