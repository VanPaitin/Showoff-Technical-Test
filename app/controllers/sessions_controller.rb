class SessionsController < ApplicationController
  def create
    payload = client_credentials.merge(session_params.merge(grant_type: 'password'))

    response = RestClient.post(
      ShowoffApi.sessions.create, payload)

    render json: serialize(response), status: 201
  end

  private

  def session_params
    params.require(:session).permit(:username, :password)
  end
end
