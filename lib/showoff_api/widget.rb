module ShowoffApi
  class Widget < Base
    def visible
      base_url + '/api/v1/widgets/visible'
    end
  end
end
