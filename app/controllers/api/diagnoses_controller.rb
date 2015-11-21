class Api::DiagnosesController < ApplicationController
  def index
    if params[:limit]
      @diagnoses = Diagnosis.most_selected(params[:query])
    else
      @diagnoses = Diagnosis.all
    end
  end
end
