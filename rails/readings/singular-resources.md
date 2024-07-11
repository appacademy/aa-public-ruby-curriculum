# Singular `resource`s

In Rails' __routes.rb__ file, you can use the `resources` method to quickly
declare all of the RESTful routes for a given controller.

Rails also provides a `resource` (singular) method that you can use to declare
routes for resources you will access without `:id`s, that is, resources where a
user will only ever access one. In your auth pattern, you use a singular
`resource` `session` because a user only interacts with one session (i.e., their
own).

> NB: Although your routes may be "singular" when you declare them with
> `resource`, you should still follow the 'plural control names' convention. In
> this case, your controller is named `SessionsController` despite routing
> through `/session`. **Controller names are always plural.**

For more on singular resources see the [Rails Docs][singular-resources].

[singular-resources]:http://guides.rubyonrails.org/routing.html#singular-resources
