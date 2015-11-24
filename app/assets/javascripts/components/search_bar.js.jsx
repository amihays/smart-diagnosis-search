const COMMON_ABBREVS = {
  flu: "influenza",
  broke: "frature",
  broken: "fracture",
  CNS: "central nervous system"
};

window.SearchBar = React.createClass({
  // getInitialState: function () {
  //   return {query: "", suggestedDiagnoses: [], submitted: false}
  // },
  //
  // componentDidMount: function () {
  //   DiagnosisStore.addTopChangeListener(this._onDiagnosesChange);
  //   DiagnosisStore.addAllChangeListener(this._onDiagnosesChange);
  //   ApiUtil.fetchAllDiagnoses({query: this.state.query});
  // },
  //
  // componentWillUnmount: function () {
  //   DiagnosisStore.removeTopChangeListener(this._onDiagnosesChange);
  //   DiagnosisStore.removeAllChangeListener(this._onDiagnosesChange);
  // },
  //
  // _onDiagnosesChange: function () {
  //   var topDiagnoses = DiagnosisStore.top();
  //   var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses);
  //   this.setState({suggestedDiagnoses: diagnoses});
  // },
  //
  // _handleQueryChange: function (e) {
  //   this.setState({query: e.target.value, submitted: false}, this._fetchTopDiagnoses);
  // },
  //
  // _keyDownHandler: function (e) {
  //   if (e.key === "Enter") {
  //     this.setState({submitted: true})
  //   }
  // },
  //
  // _fetchTopDiagnoses: function () {
  //   ApiUtil.fetchTopDiagnoses({query: this.state.query, limit: 10});
  // },
  //
  //
  render: function () {
    return(
      <div>
        <input type='text'
               id='search-bar'
               value={this.props.query}
               onChange={this.props.handleQueryChange}
               onKeyDown={this.props.handleKeyDown}
               placeholder='search diagnoses'/>
      </div>
    );
  }
})
