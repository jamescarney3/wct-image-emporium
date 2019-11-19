Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  resource :sessions, only: [:show, :destroy], defaults: { format: :json }

  get 'auth/:provider/callback', to: 'sessions#create', as: :oauth_callback
  get 'auth/failure', to: 'static_pages#root', as: :oauth_failure

  get 'unauthorized', to: 'static_pages#root', as: :unauthorized
  get 'admin', to: 'static_pages#root', as: :admin
  get '*path', to: 'static_pages#root'
end
