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
    return topDiagnoses.concat(this._relevantDiagnoses(10 - topDiagnoses.length));
  },

  _relevantDiagnoses: function (count) {
    var allDiagnoses = DiagnosisStore.all();
    // var relevanceScores = this._computeRelevance(allDiagnoses);
    var numSearchWords = this.state.query.split(/[ -]/).length;
    // console.log(relevanceScores);
    var resultCounts = [];
    allDiagnoses.forEach(function(diagnosis) {
      var searchRelevance = this._searchRelevance(diagnosis);
      // console.log(diagnosis, searchRelevance);
      if (searchRelevance >= numSearchWords) {
        var added = false;
        for (var i = 0; i < resultCounts.length; i++) {
          if (resultCounts[i][1] < searchRelevance) {
            resultCounts.splice(i, 0, [diagnosis, searchRelevance]);
            added = true;
            break;
          }
        }
        if (!added && resultCounts.length < count && searchRelevance >= numSearchWords) {
          resultCounts.push([diagnosis, searchRelevance]);
        } else if (resultCounts.length > count) {
          resultCounts = resultCounts.slice(0, count)
        }
      }
    }.bind(this));
    return resultCounts.map(function(result) { return result[0]; });
  },
  //
  // _computeRelevance: function (diagnoses) {
  //   var relevanceScores = {};
  //   diagnoses.forEach(function (diagnosis) {
  //     var relevance = this._searchRelevance(diagnosis);
  //     relevanceScores[diagnosis] = relevance;
  //   }.bind(this))
  //   return relevanceScores;
  // },

  _searchRelevance: function (diagnosis) {
    var searchWords = this.state.query.split(/[ -]/);
    var sum = 0;
    searchWords.forEach(function(word) {
      sum += this._wordRelevance(diagnosis, word);
    }.bind(this))
    return sum;
  },

  _wordRelevance: function (diagnosis, word) {
    if (word === "") {
      return 0;
    }
    var wordRegex = new RegExp('^' + word.toLowerCase());
    var abbrevRegex = COMMON_ABBREVS[word] ? new RegExp('^' + COMMON_ABBREVS[word]) : null;
    var wordRelevance = 0;
    diagnosis.split(/[ -]/).forEach(function(diagnosisWord) {
      if (abbrevRegex && diagnosisWord.toLowerCase().match(abbrevRegex)) {
        wordRelevance += 1.01;
      } else if (diagnosisWord.toLowerCase().match(wordRegex)) {
        wordRelevance += 1;
      } else {
        wordRelevance += 0;
      }
    });
    return wordRelevance;
  },

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
