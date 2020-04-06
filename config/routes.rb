Rails.application.routes.draw do
  root 'home#index'

  resources :users, only: [] do
    resources :widgets, only: :index
  end
  resources :widgets, only: [] do
    get 'visible', on: :collection
  end

  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
