window.Dropdown = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnoses.map(function(diagnosis){
            return(
              <div key={this.props.diagnoses.indexOf(diagnosis)}>{diagnosis}</div>
            )
          }.bind(this))
        }
      </div>
    )
  }
})
