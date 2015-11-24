window.Dropdown = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnoses.map(function(diagnosis){
            return(
              <div onClick={this.props.diagnosisClickHandler}
                   name={diagnosis}
                   key={this.props.diagnoses.indexOf(diagnosis)}>{diagnosis}</div>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
