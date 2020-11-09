Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  resources :users, only: [:edit, :update]
end
