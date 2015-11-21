window.ApiActions = {
  receiveTopDiagnoses: function (topDiagnoses) {
    AppDispatcher.dispatch({
      actionType: window.DiagnosisConstants.TOP_DIAGNOSES_RECEIVED,
      topDiagnoses: topDiagnoses
    })
  },

  receiveAllDiagnoses: function (allDiagnoses) {
    AppDispatcher.dispatch({
      actionType: window.DiagnosisConstants.ALL_DIAGNOSES_RECEIVED,
      allDiagnoses: allDiagnoses
    })
  }
}
