# Checklist For Rails MVC Setup

- [ ] Initialize a rails project using PostgreSQL (`rails new myapp
  --database=postgresql -T -G --minimal`)
- [ ] Add necessary gems to the Gemfile and bundle (`bundle install`)
- [ ] Set up your project's database (`rails db:create`)
- [ ] Set up your database via migrations (`rails g migration CreateCats` /
  `rails g model Cat`)
- [ ] Run your migrations (`rails db:migrate`)
- [ ] Create models (one for each table in your database)
  - [ ] Add validations
  - [ ] Add associations
  - [ ] Add custom methods/validations
- [ ] Add resource routes to your __config/routes.rb__ file that map your HTTP
  verb and url to specific controller actions
- [ ] Create controllers (one for each model)
- [ ] Create views (one for each page that you want to render from your
  controllers)
