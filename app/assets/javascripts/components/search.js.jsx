window.Search = React.createClass({
  render: function () {
    return(
      <div>
        <SearchBar query={this.props.query}
                   handleQueryChange={this.props.handleQueryChange}
                   handleKeyDown={this.props.handleKeyDown}/>
        <DiagnosesDropdownList diagnoses={this.props.diagnosesDropdownList}
                               handleDiagnosisClick={this.props.handleDiagnosisClick}/>
      </div>
    )
  }
})
