class WidgetsController < ApplicationController
  def index
  end

  def visible
    response = RestClient.get(
      ShowoffApi.widgets.visible,
      { params: client_credentials }
    )

    render json: response.body, status: 200
  end
end
