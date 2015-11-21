window.ApiUtil = {
  fetchTopDiagnoses: function(params) {
    $.ajax({
      url: "api/diagnoses",
      type: "get",
      data: params,
      success: function (diagnoses) {
        ApiActions.receiveTopDiagnoses(diagnoses);
      }
    })
  },

  fetchAllDiagnoses: function(params) {
    $.ajax({
      url: "api/diagnoses",
      type: "get",
      data: params,
      success: function (diagnoses) {
        ApiActions.receiveAllDiagnoses(diagnoses);
      }
    })
  }
}
