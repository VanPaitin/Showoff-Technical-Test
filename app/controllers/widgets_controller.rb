class WidgetsController < ApplicationController
  def index
    query_params = client_credentials.merge(search_params).to_query

    response = RestClient.get(
      ShowoffApi.users.widgets(params[:user_id]) + '?' + query_params,
      { Authorization: request.headers['Authorization'] },
    )

    render json: serialize(response), status: 200
  end

  def visible
    response = RestClient.get(
      ShowoffApi.widgets.visible,
      { params: client_credentials.merge(search_params) }
    )

    render json: serialize(response), status: 200
  end

  private

  def search_params
    params.permit(:term)
  end
end
