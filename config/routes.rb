Rails.application.routes.draw do
  root 'home#index'

  resources :sessions, only: :create

  resources :users, only: :create do
    resources :widgets, only: :index
    post 'change_password', on: :collection
    post 'reset_password', on: :collection
  end

  resources :widgets, only: [] do
    get 'visible', on: :collection
  end

  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
