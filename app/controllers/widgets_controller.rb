class WidgetsController < ApplicationController
  def index
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
