class UsersController < ApplicationController
  def create
    user_payload = params.require(:user)

    if params[:file]
      uploader = AvatarUploader.new
      uploader.store!(params[:file])
      user_payload.merge(image_url: uploader.url)
    end

    response = RestClient.post(
      ShowoffApi.users.create,
      client_credentials.merge(user: user_payload)
    )

    render json: serialize(response), status: 201
  end
end
