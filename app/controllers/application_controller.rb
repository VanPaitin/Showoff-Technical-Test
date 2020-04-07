class ApplicationController < ActionController::Base
  private

  def client_credentials
    {
      client_id: ENV['SHOWOFF_CLIENT_ID'],
      client_secret: ENV['SHOWOFF_CLIENT_SECRET']
    }
  end

  def serialize(response)
    JSON.parse(response)['data']
  end
end
