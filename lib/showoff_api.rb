module ShowoffApi
  class << self
    def widgets
      Widget.new
    end

    def users
      User.new
    end
  end
end
