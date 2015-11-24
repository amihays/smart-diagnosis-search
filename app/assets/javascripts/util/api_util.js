window.ApiUtil = {
  fetchTopDiagnoses: function (params) {
    $.ajax({
      url: "api/diagnoses",
      type: "get",
      data: params,
      success: function (diagnoses) {
        ApiActions.receiveTopDiagnoses(diagnoses);
      }
    })
  },

  fetchAllDiagnoses: function (params) {
    $.ajax({
      url: "api/diagnoses",
      type: "get",
      data: params,
      success: function (diagnoses) {
        ApiActions.receiveAllDiagnoses(diagnoses);
      }
    })
  },

  createQuery: function (params) {
    $.ajax({
      url: "api/queries",
      type: "post",
      data: {query: params},
      success: function () {
        console.log(arguments);
      }
    })
  }
}
