window.DiagnosesList = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnosesList.map(function(diagnosis){
            return(
              <diagnosesListItem diagnosisClickHandler={this.props.diagnosisClickHandler}
                                 diagnosis={diagnosis}
                                 key={diagnosis[1]}/>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
