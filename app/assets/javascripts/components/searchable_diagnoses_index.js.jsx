const COMMON_ABBREVS = {
  flu: "influenza",
  broke: "frature",
  broken: "fracture",
  cns: "central nervous system"
};

window.SearchableDiagnosesIndex = React.createClass({
  getInitialState: function () {
    return {query: "", diagnosesList: [], diagnosesDropdownList: [], notifications: []};
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

  handleDiagnosisClick: function (e) {
    ApiUtil.createQuery({diagnosis_name: e.target.textContent, text: this.state.query}, this.resetState);
  },

  resetState: function () {
    this.setState({query: "", diagnosesDropdownList: [], diagnosesList: [], notifications: ["diagnosis submission successful"]});
    window.setTimeout(function() {
      this.setState({notifications: []});
    }.bind(this), 2000)
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
    var queryWords = this.state.query.split(/[ -]/);
    queryWords.forEach(function(searchWord, idx) {
      var lowerCaseWord = searchWord.toLowerCase();
      if (idx === queryWords.length - 1) {
        regExpString += "(?=.*\\b" + this.escapeRegExp(lowerCaseWord)
                      + "|.*\\s" + this.escapeRegExp(lowerCaseWord);
        if (COMMON_ABBREVS[lowerCaseWord]) {
          regExpString += "|.*\\b" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord])
                        + "|.*\\s" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord]);
        }
      } else {
        regExpString += "(?=.*\\b" + this.escapeRegExp(lowerCaseWord) + "\\b"
                      + "|.*\\s" + this.escapeRegExp(lowerCaseWord) + "\\b"
                      + "|.*\\b" + this.escapeRegExp(lowerCaseWord) + "\\s"
                      + "|.*\\s" + this.escapeRegExp(lowerCaseWord) + "\\s";
        if (COMMON_ABBREVS[lowerCaseWord]) {
          regExpString += "|.*\\b" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord]) + "\\b"
                        + "|.*\\s" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord]) + "\\b"
                        + "|.*\\b" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord]) + "\\s"
                        + "|.*\\s" + this.escapeRegExp(COMMON_ABBREVS[lowerCaseWord]) + "\\s";
        }
      }
      regExpString += ")";
    }.bind(this));
    return regExpString;
  },

  escapeRegExp: function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  render: function () {
    return (
      <div>
        <FlashNotificationList notifications={this.state.notifications}/>
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
