window.Search = React.createClass({
  render: function () {
    return(
      <div className="search">
        <SearchBar query={this.props.query}
                   handleSubmit={this.props.handleSubmit}
                   handleQueryChange={this.props.handleQueryChange}
                   handleKeyDown={this.props.handleKeyDown}/>
        <DiagnosesDropdownList diagnoses={this.props.diagnosesDropdownList}
                               handleDiagnosisClick={this.props.handleDiagnosisClick}/>
      </div>
    )
  }
})
