class Api::DiagnosesController < ApplicationController
  def index
    if params[:limit]
      @diagnoses = Diagnosis.most_selected(params[:query]).map { |diagnosis| diagnosis.name }
    else
      @diagnoses = Diagnosis.all.map { |diagnosis| diagnosis.name }
    end
  end
end
