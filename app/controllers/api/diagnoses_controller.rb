class Api::DiagnosesController < ApplicationController
  def index
    if params[:limit]
      @diagnoses = Diagnosis.most_selected(params[:query], params[:limit]).map { |diagnosis| [diagnosis.name, diagnosis.id] }
    else
      @diagnoses = Diagnosis.all.map { |diagnosis| [diagnosis.name, diagnosis.id] }
    end
  end
end
