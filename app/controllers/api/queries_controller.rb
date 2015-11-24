class Api::QueriesController < ApplicationController
  def create
    name = params[:query][:diagnosis_name]
    diagnosis = Diagnosis.find_by(name: name)
    query = Query.find_by(text: params[:query][:text])
    begin
      if query
        @query = query
        diagnosisSelection = DiagnosisSelection.create({query_id: query.id, diagnosis_id: diagnosis.id})
      else
        @query = diagnosis.queries.create(query_params)
      end
    rescue Exception => e
      render json: "failed create diagnosisSelection", status: 422
    end
    render :show unless e
  end

  def index
    @queries = Query.all
  end

  private
  def query_params
    params.require(:query).permit(:text)
  end
end
