module ShowoffApi
  class User < Base
    def create
      base_url + '/api/v1/users'
    end

    def personal
      base_url + '/api/v1/users/me'
    end

    def show(id)
      base_url + "/api/v1/users/#{id}"
    end

    def change_password
      base_url + '/api/v1/users/me/password'
    end

    def reset_password
      base_url + '/api/v1/users/reset_password'
    end
  end
end
