# Rails Parameter Conventions

Rails stores parameters in an `ActionController::Parameters` object that you can
access by calling `params`. While an `ActionController::Parameters` object is
not a hash, it is hash-like, meaning that it will respond to most `Hash` methods
(because the developers have similarly defined those methods on
`ActionController::Parameters` too). In other words, in most cases, you can
simply treat `params` **as if** it returned a `Hash`.

As you've seen in the previous sections, values from forms can be at the top
level of the `params` object or nested in an internal hash-like structure. For
example, in a standard `create` action for a `Person` model, `params[:person]`
is expected to be a hash-like object of all the attributes for the person to
create. `params` can also contain arrays, arrays of hash-like objects, and so
on. (For constructing such parameters, see below.)

Fundamentally, HTML forms don't know about any sort of structured data: all they
generate is name–value pairs, where pairs are just plain strings. The arrays and
hash-like objects you see in your application are the result of some parameter
naming conventions that Rails uses.

**TIP**: You may find you can try out examples in this section faster by using
the console to directly invoke Rack's parameter parser. For example:

```ruby
[1] pry(main)> Rack::Utils.parse_nested_query('name=fred&phone=0123456789')
=> {"name"=>"fred", "phone"=>"0123456789"}
[2] pry(main)> Rack::Utils.parse_nested_query('user[name]=fred&user[phone]=0123456789')
=> {"user" => { "name"=>"fred", "phone"=>"0123456789"} }
[3] pry(main)> Rack::Utils.parse_nested_query('languages[]=Ruby&languages[]=JavaScript')
=> {"languages"=>["Ruby", "JavaScript"]}
```

## Basic structures: Hash

The two basic structures are arrays and hashes (technically, hash-like objects).
Hashes mirror the syntax used for accessing the value in `params`. For example,
if a form contains

```html
<input id="person_name" name="person[name]" type="text" value="Henry">
```

`params` will return an object that looks like this:

```ruby
{ 'person' => { 'name' => 'Henry' } }
```

`params[:person][:name]` will then retrieve the submitted value in the
controller.

These hash-like objects can be nested as many levels as required, e.g.:

```html
<input id="person_address_city" name="person[address][city]" type="text" value="New York">
```

will result in the `params` object being

```ruby
{ 'person' => { 'address' => { 'city' => 'New York' } } }
```

## Basic structures: Arrays

Normally Rails ignores duplicate parameter names. For instance, if your form
contains:

```html
<input type="hidden" name="key" value="value1">
<input type="hidden" name="key" value="value2">
```

then on submission, the browser will send:

```html
key=value1&key=value2
```

When Rails goes to parse this, it will return:

```ruby
{ 'key' => 'value2' }
```

The last value wins; Rails overwrites any prior values. Note that Rails is the
one which does this: the browser is happy to upload multiple values for the same
name.

When you want Rails to build an array, you append an empty set of square
brackets to the name:

```html
<input name="person[phone_numbers][]" type="text" value="555-123-4567">
<input name="person[phone_numbers][]" type="text" value="555-765-4321">
<input name="person[phone_numbers][]" type="text" value="555-135-2468">
```

Rails will parse the uploaded params as

```ruby
{ 'person' => {
    'phone_numbers' => [
      '555-123-4567',
      '555-765-4321',
      '555-135-2468'
    ]
  }
}
```

Similarly, you can create an array of hash-like objects like this:

```html
<input name="persons[][phone_number]" type="text" value="555-123-4567">
<input name="persons[][phone_number]" type="text" value="555-765-4321">
<input name="persons[][phone_number]" type="text" value="555-135-2468">
```

Rails will parse these uploaded params as

```ruby
{ 'persons' => [
    { 'phone_number' => '555-123-4567' },
    { 'phone_number' => '555-765-4321' },
    { 'phone_number' => '555-135-2468' }
  ]
}
```
