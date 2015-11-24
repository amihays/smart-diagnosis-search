(function(root) {
  var _allDiagnoses = [];
  var _topDiagnoses = [];
  var TOP_DIAGNOSES_CHANGE_EVENT = "topDiagnosesChange";
  var ALL_DIAGNOSES_CHANGE_EVENT = "allDiagnosesChange";

  var resetAllDiagnoses = function (allDiagnoses) {
    _allDiagnoses = allDiagnoses.diagnoses;
  };

  var resetTopDiagnoses = function (topDiagnoses) {
    _topDiagnoses = topDiagnoses.diagnoses;
  };

  root.DiagnosisStore = $.extend({}, EventEmitter.prototype, {
    top: function () {
      return _topDiagnoses.slice();
    },

    all: function () {
      return _allDiagnoses.slice();
    },

    addTopChangeListener: function (callback) {
      DiagnosisStore.on(TOP_DIAGNOSES_CHANGE_EVENT, callback);
    },

    removeTopChangeListener: function (callback) {
      DiagnosisStore.removeListener(TOP_DIAGNOSES_CHANGE_EVENT, callback);
    },

    addAllChangeListener: function (callback) {
      DiagnosisStore.on(ALL_DIAGNOSES_CHANGE_EVENT, callback);
    },

    removeAllChangeListener: function (callback) {
      DiagnosisStore.removeListener(ALL_DIAGNOSES_CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case DiagnosisConstants.TOP_DIAGNOSES_RECEIVED:
          resetTopDiagnoses(payload.topDiagnoses);
          DiagnosisStore.emit(TOP_DIAGNOSES_CHANGE_EVENT);
          break;
        case DiagnosisConstants.ALL_DIAGNOSES_RECEIVED:
          resetAllDiagnoses(payload.allDiagnoses);
          DiagnosisStore.emit(ALL_DIAGNOSES_CHANGE_EVENT);
          break;
      }
    })
  })
}(this))
