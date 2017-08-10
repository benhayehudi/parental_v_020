Rails.application.routes.draw do
  root 'sessions#new'
  resources :registrations, only: [:new, :create]
  post '/registrations/new' => 'registrations#create'
  get '/logout' => 'sessions#destroy'

  resources :sessions, only: [:new, :create, :destroy]
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/auth/facebook/callback' => 'registrations#facebook'
  get '/auth/twitter/callback', to: 'registrations#twitter'
 
  resources :parents, only: [:show, :update] do
    resources :todos, only: [:index, :new, :show, :create,:destroy, :update] do
      resources :tasks, only: [:new, :create, :destroy, :update]
    end
  end

  resources :admin, only: [:index, :show, :edit, :update, :destroy]
  post '/admin/:id/edit' => 'admin#update'
  post '/parents/:id' => 'admin#update'

  post '/todos/new' => 'todos#create'
  post '/todos/:id/tasks/:id' => 'tasks#update'

  get '/about' => 'welcome#about'
  get '/contact' => 'welcome#contact'
  get '/terms' => 'welcome#terms'
end
