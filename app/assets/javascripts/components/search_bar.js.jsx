const COMMON_ABBREVS = {
  flu: "influenza"
}

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
    console.log(topDiagnoses);
    var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses);
    console.log(diagnoses);
    this.setState({suggestedDiagnoses: diagnoses});
  },
  //
  // _onAllDiagnosesChange: function () {
  //   var topDiagnoses = DiagnosisStore.top();
  //   var diagnoses = this._calculateSuggestedDiagnoses(topDiagnoses);
  //   this.setState({suggestedDiagnoses: diagnoses});
  // },

  _handleQueryChange: function (e) {
    this.setState({query: e.target.value}, this._fetchTopDiagnoses);
  },

  _fetchTopDiagnoses: function () {
    ApiUtil.fetchTopDiagnoses({query: this.state.query});
  },

  _calculateSuggestedDiagnoses: function (topDiagnoses) {
    if (topDiagnoses.length > 0) {
      return topDiagnoses;
    } else {
      return topDiagnoses.concat(this._relevantDiagnoses(5 - topDiagnoses.length));
    }
  },

  _relevantDiagnoses: function (count) {
    var allDiagnoses = DiagnosisStore.all();
    var relevanceScores = this._computeRelevance(allDiagnoses);
    var numSearchWords = this.state.query.split(/[ -]/).length;
    return allDiagnoses.slice(0,5);
  },

  _computeRelevance: function (diagnoses) {
    var relevanceScores = {};
    diagnoses.forEach(function (diagnosis) {
      var relevance = this._searchRelevance(diagnosis);
      relevanceScores[diagnosis] = relevance;
    }.bind(this))
    return relevanceScores;
  },

  _searchRelevance: function (diagnosis, search) {
    var searchWords = this.state.query.split(/[ -]/);
    var sum = 0;
    searchWords.forEach(function(word) {
      sum += this._wordRelevance(diagnosis, word);
    }.bind(this))
  },

  _wordRelevance: function (diagnosis, word) {
    var wordRegex = new RegExp('^' + word);
    var abbrevRegex = COMMON_ABBREVS[word] ? new RegExp('^' + COMMON_ABBREVS[word]) : null;
    diagnosis.name.split(/[ -]/).forEach(function(searchWord) {
      if (abbrevRegex && searchWord.match(abbrevRegex)) {
        return 1.01;
      } else if (searchWord.match(wordRegex)) {
        return 1;
      } else {
        return 0;
      }
    })
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
