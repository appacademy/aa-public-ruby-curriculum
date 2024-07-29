# Rails Forms

```html
<input type='hidden' name='cat[tag_ids][]' value=''>
```

What is the purpose of the above line of code?
- [ ] To set the 'tag_ids' to all available tags, the default value.
- [ ] To prevent any 'tag_ids' from being displayed on the page.
- [ ] To ensure 'tag_ids' is set to an empty array even if nothing was selected.

<details><summary>Answer:</summary>

To ensure 'tag_ids' is set to an empty array even if nothing was selected.</details>
<details><summary>Explanation:</summary>

To ensure that 'tag_ids' sends an empty array even if no selection was made, you can set the `name` to `cat[tag_ids][]`. </details>

```ruby
# Consider the following code:

# cats_controller.rb
def index
  if params[:tag]
    @cats = Tag.find_by(name: params[:tag]).cats
  else
    @cats = Cat.all
  end

  render :index
end
```

What will a GET request to `/cats?cat_name=Markov` result in?
- [ ] A list of all the cats.
- [ ] Only the cats named 'Markov'.
- [ ] An error.

<details><summary>Answer:</summary>

A list of all the cats.</details>
<details><summary>Explanation:</summary>

Since there is no `tag` parameter being passed in, the above request will produce a list of all the cats.</details>

```ruby
# Consider the following code:

# cats_controller.rb
def index
  if params[:tag]
    @cats = Tag.find_by(name: params[:tag]).cats
  else
    @cats = Cat.all
  end

  render :index
end
```

What will a GET request to `/cats?tag=athletic` result in?
- [ ] A list of all the cats.
- [ ] A list of all the cats tagged 'athletic'.
- [ ]  An empty list, no cats.
- [ ]  An error.

<details><summary>Answer:</summary>

A list of all the cats tagged 'athletic'.</details>
<details><summary>Explanation:</summary>

This request has a `tag` parameter, so it will produce a list of all the cats tagged 'athletic'.</details>

How are concerns different from regular modules? (Select all that apply.)
- [ ] They can run code in the class scope at the time they are included.
- [ ] They have their own dedicated folders in the default Rails folder hierarchy.
- [ ] They include the line 'extend ActiveSupport::Concern'

<details><summary>Answer:</summary>

- They can run code in the class scope at the time they are included.
- They have their own dedicated folders in the default Rails folder hierarchy.
- They include the line 'extend ActiveSupport::Concern'</details>
<details><summary>Explanation:</summary>

All of the above!</details>

What extra key-value pair must be added to a 'belongs_to' association to enable polymorphic associative behavior?
- [ ] `polymorphic: true`
- [ ] `polymorphic_key: :id`
- [ ] `as: :polymorphic`
- [ ] `as: :pictureable`

<details><summary>Answer:</summary>

`polymorphic: true`</details>
<details><summary>Explanation:</summary>

It's as simple as marking the association `polymorphic: true`.</details>
