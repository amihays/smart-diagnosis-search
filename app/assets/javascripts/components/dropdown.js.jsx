window.Dropdown = React.createClass({
  render: function () {
    return(
      <div>
        {
          this.props.diagnoses.map(function(diagnosis){
            return(
              <div key={diagnosis.id}>{diagnosis.name}</div>
            )
          })
        }
      </div>
    )
  }
})
