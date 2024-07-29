Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "users#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:index, :show, :new, :create]
  resources :goals do
    resources :cheers, only: [:create]
  end
  resources :cheers, only: [:index]
  resources :user_comments, only: [:create]
  resources :goal_comments, only: [:create]
end