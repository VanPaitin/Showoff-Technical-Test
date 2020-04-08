module ShowoffApi
  class Session < Base
    def create
      base_url + '/oauth/token'
    end
  end
end
