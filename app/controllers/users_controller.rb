class UsersController < ApplicationController
  def create
    user_payload = user_params

    # if params[:file]
    #   uploader = AvatarUploader.new
    #   uploader.store!(params[:file])
    #   user_payload.merge! image_url: uploader.url
    # end

    response = RestClient.post(
      ShowoffApi.users.create,
      client_credentials.merge(user: user_payload).to_json,
      { content_type: :json }
    )

    render json: serialize(response), status: 201
  end

  def reset_password
    RestClient.post(
      ShowoffApi.users.reset_password,
      client_credentials.merge(user: user_params).to_json, { content_type: :json })

    head 204
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
