const COMMON_ABBREVS = {
  flu: "influenza"
};

window.SearchBar = React.createClass({
  getInitialState: function () {
    return {query: "", suggestedDiagnoses: []}
  },

  componentDidMount: function () {
    DiagnosisStore.addTopChangeListener(this._onDiagnosesChange);
    DiagnosisStore.addAllChangeListener(this._onDiagnosesChange);
    ApiUtil.fetchAllDiagnoses({query: this.state.query});
  },

  componentWillUnmount: function () {
    DiagnosisStore.removeTopChangeListener(this._onDiagnosesChange);
    DiagnosisStore.removeAllChangeListener(this._onDiagnosesChange);
  },

  _onDiagnosesChange: function () {
    var topDiagnoses = DiagnosisStore.top();
    var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses);
    this.setState({suggestedDiagnoses: diagnoses});
  },

  _handleQueryChange: function (e) {
    this.setState({query: e.target.value}, this._fetchTopDiagnoses);
  },

  _fetchTopDiagnoses: function () {
    ApiUtil.fetchTopDiagnoses({query: this.state.query, limit: 10});
  },

  _calculateSuggestedDiagnoses: function (topDiagnoses) {
    if (this.state.query === "") {
      return [];
    } else {
      return topDiagnoses.concat(this._relevantDiagnoses(10 - topDiagnoses.length));
    }
  },

  _relevantDiagnoses: function (count) {
    var searchRegExp = new RegExp(this._regExpString(), "i");
    var results = [];
    DiagnosisStore.all().forEach(function(diagnosis) {
      if (diagnosis.search(searchRegExp) >= 0) {
          results.push(diagnosis);
      }
    }.bind(this));
    return results.slice(0, count);
  },

  _regExpString: function () {
    var regExpString = "";
    this.state.query.split(/[ -]/).forEach(function(searchWord) {
      var lowerCaseWord = searchWord.toLowerCase();
      regExpString += "(?=.* " + lowerCaseWord + "|^" + lowerCaseWord;
      if (COMMON_ABBREVS[lowerCaseWord]) {
        regExpString += "|.* " + COMMON_ABBREVS[lowerCaseWord] + "|^" + COMMON_ABBREVS[lowerCaseWord];
      }
      regExpString += ")";
    });
    return regExpString;
  },

  diagnosisClickHandler: function (e) {
    // debugger;
    ApiUtil.createQuery({diagnosis_name: e.target.textContent, text: this.state.query});
  },

  render: function () {
    return(
      <div>
        <input type='text'
               className='search-bar'
               value={this.filter}
               onChange={this._handleQueryChange}
               placeholder='search diagnoses'/>
             <Dropdown diagnoses={this.state.suggestedDiagnoses}
                       diagnosisClickHandler={this.diagnosisClickHandler}/>
      </div>
    )
  }
})
