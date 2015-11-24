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
    var searchWords = this.state.query.split(/[ -]/);
    var regExpString = "";
    searchWords.forEach(function(word) {
      regExpString += "(?=.* " + word + "|^" + word
      if (COMMON_ABBREVS[word]) {
        regExpString += "|.* " + COMMON_ABBREVS[word] + "|^" + COMMON_ABBREVS[word];
      }
      regExpString += ")";
    });
    var searchRegExp = new RegExp(regExpString);
    var results = [];
    DiagnosisStore.all().forEach(function(diagnosis) {
      if (diagnosis.search(searchRegExp) >= 0) {
          results.push(diagnosis);
      }
    }.bind(this));
    return results.slice(0, 5);
  },

  // _relevantDiagnoses: function (count) {
  //   var numSearchWords = this.state.query.split(/[ -]/).length;
  //   var resultCounts = [];
  //   DiagnosisStore.all().forEach(function(diagnosis) {
  //     var searchRelevance = this._searchRelevance(diagnosis);
  //     if (searchRelevance >= numSearchWords) {
  //       var added = false;
  //       for (var i = 0; i < resultCounts.length; i++) {
  //         if (resultCounts[i][1] < searchRelevance) {
  //           resultCounts.splice(i, 0, [diagnosis, searchRelevance]);
  //           added = true;
  //           break;
  //         }
  //       }
  //       if (!added && resultCounts.length < count && searchRelevance >= numSearchWords) {
  //         resultCounts.push([diagnosis, searchRelevance]);
  //       } else if (resultCounts.length > count) {
  //         resultCounts = resultCounts.slice(0, count)
  //       }
  //     }
  //   }.bind(this));
  //   return resultCounts.map(function(result) { return result[0]; });
  // },
  //
  // _searchRelevance: function (diagnosis) {
  //   var searchWords = this.state.query.split(/[ -]/);
  //   var sum = 0;
  //   searchWords.forEach(function(word) {
  //     sum += this._wordRelevance(diagnosis, word);
  //   }.bind(this))
  //   return sum;
  // },
  //
  // _wordRelevance: function (diagnosis, word) {
  //   if (word === "") {
  //     return 1;
  //   }
  //   var wordRegex = new RegExp('^' + word.toLowerCase());
  //   var abbrevRegex = COMMON_ABBREVS[word] ? new RegExp('^' + COMMON_ABBREVS[word]) : null;
  //   var wordRelevance = 0;
  //   diagnosis.split(/[ -]/).forEach(function(diagnosisWord) {
  //     if (abbrevRegex && diagnosisWord.toLowerCase().match(abbrevRegex)) {
  //       wordRelevance = 1.1;
  //     } else if (diagnosisWord.toLowerCase().match(wordRegex)) {
  //       wordRelevance = wordRelevance > 1 ? wordRelevance : 1;
  //     }
  //   });
  //   return wordRelevance;
  // },

  render: function () {
    return(
      <div>
        <input type='text'
               className='search-bar'
               value={this.filter}
               onChange={this._handleQueryChange}
               placeholder='search diagnoses'/>
        <Dropdown diagnoses={this.state.suggestedDiagnoses}/>
      </div>
    )
  }
})
