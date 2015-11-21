class Api::QueriesController < ApplicationController
  def create
    @query = Query.new(query_params) # how to create both diagnosis_selection & query at once?
    if @query.save
      render :show
    else
      render json: @query.errors.full_messages, status: 422
    end
  end

  def index
    @queries = Query.all
  end

  private
  def query_params
    params.require(:query).permit(:name, :diagnosis_id)
  end
end
