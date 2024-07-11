Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :tweets

  namespace :api, defaults: {format: :json} do
    resources :tweets, only: [:index, :create, :show]
  end

end
