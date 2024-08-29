Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "cats#index"

  resources :cats, except: :destroy do
    resources :cat_rental_requests, only: [:new]
  end
  resources :cat_rental_requests, only: [:new, :create] do
    member do
      post :approve
      post :deny
    end
  end
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
end