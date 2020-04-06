module ShowoffApi
  class Base
    def base_url
      ENV['SHOWOFF_API_DOMAIN']
    end
  end
end
