const COMMON_ABBREVS = {
  flu: "influenza",
  broke: "frature",
  broken: "fracture",
  cns: "central nervous system"
};

window.SearchableDiagnosesIndex = React.createClass({
  getInitialState: function () {
    return {query: "", diagnosesList: [], diagnosesDropdownList: []};
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
    var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses, 7);
    this.setState({diagnosesDropdownList: diagnoses});
  },

  handleQueryChange: function (e) {
    this.setState({query: e.target.value}, this._fetchTopDiagnoses.bind(null, 7));
  },

  handleKeyDown: function (e) {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  },

  handleSubmit: function () {
      var topDiagnoses = DiagnosisStore.top();
      var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses, 100);
      this.setState({diagnosesDropdownList: [], diagnosesList: diagnoses});
  },

  _fetchTopDiagnoses: function (count) {
    ApiUtil.fetchTopDiagnoses({query: this.state.query, limit: count});
  },

  _calculateSuggestedDiagnoses: function (topDiagnoses, count) {
    if (this.state.query === "") {
      return [];
    } else {
      return topDiagnoses.concat(this._relevantDiagnoses(count - topDiagnoses.length, topDiagnoses));
    }
  },

  _relevantDiagnoses: function (count, topDiagnoses) {
    var searchRegExp = new RegExp(this._regExpString(), "i");
    var results = [];
    DiagnosisStore.all().forEach(function(diagnosis) {
      if (diagnosis[0].search(searchRegExp) >= 0) {
        var found = false;
        for (i = 0; i < topDiagnoses.length; i++) {
          if (topDiagnoses[i][0] === diagnosis[0] && topDiagnoses[i][1] === diagnosis[1]) {
            found = true;
          }
        }
        if (!found) {
          results.push(diagnosis);
        }
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

  handleDiagnosisClick: function (e) {
    ApiUtil.createQuery({diagnosis_name: e.target.textContent, text: this.state.query}, this.resetState);
  },

  resetState: function () {
    console.log('success');
    this.setState({query: "", diagnosesDropdownList: [], diagnosesList: []});
  },

  render: function () {
    return (
      <div>
        <Search query={this.state.query}
                handleSubmit={this.handleSubmit}
                handleKeyDown={this.handleKeyDown}
                handleQueryChange={this.handleQueryChange}
                diagnosesDropdownList={this.state.diagnosesDropdownList}
                handleDiagnosisClick={this.handleDiagnosisClick}/>
        <DiagnosesList handleDiagnosisClick={this.handleDiagnosisClick}
                       diagnosesList={this.state.diagnosesList}/>
      </div>
    );
  }
})
